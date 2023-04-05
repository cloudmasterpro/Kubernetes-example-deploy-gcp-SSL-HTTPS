# 🚀 Deploy a SAMPLE APP on KUBERNETES with Google Cloud, HTTPS and SSL

1. Clone Github Repo

	git clone git@github.com:cloudmasterpro/Kubernetes-example-deploy-gcp.git
	
	cd Kubernetes-example-deploy-gcp

2. Connect to Google Cloud

	gcloud auth login

3. Set your Proyect ID OR CREATE and SET a new one

	SET > gcloud config set project <google-project-name>

	CREATE 	> gcloud projects create my-new-project --name="My New Project"
			> gcloud config set project my-new-project

4. Configure docker authentication after logging into gcloud, run:

	gcloud auth configure-docker

5. Set your project ID

	export PROJECT_ID=[google-project-name]

6. Build the Docker image

	docker build -t gcr.io/${PROJECT_ID}/sample-app:v1 .

7. Push the image to GCR

	docker -- push gcr.io/${PROJECT_ID}/sample-app:v1

8. Create Kubernetes cluster (Example: 2 nodes, Spain Zone, Size e2-medium). Put your cluster name on [my-cluster]

	gcloud container clusters create my-cluster --num-nodes=2 --zone=europe-southwest1-a --machine-type=e2-medium

9. Get credentials from Kubernetes cluster

	gcloud container clusters get-credentials [my-cluster]
	
10. Modify deployment.yaml with your correct project id at line 17

	image: gcr.io/${PROJECT_ID}/sample-app:v1
  
11. Deploy APP
	
	kubectl apply -f deployment.yaml
	kubectl apply -f service.yaml

12. Create static IP with name "sample-app-ip"

	gcloud compute addresses create sample-app-ip --global

13. Check IP address

	gcloud compute addresses describe sample-app-ip --global --format="value(address)"

14. Modify ingress.yaml on line 10 with one domain that you manage

	  - host: test.example.com

15. Modify ssl-certificate.yaml on line 7 with one domain that you manage

	   - test.example.com

16. Ingress configuration

	kubectl apply -f ssl-certificate.yaml
	kubectl apply -f ingress.yaml

17. Check Certificate Status

	kubectl describe managedcertificate sample-app-certificate

18. Create DNS record TYPE A with the static IP generated on your DNS MANAGER

	    test.example.com    A     [sample-app-ip]

19. Test your app

	https://test.example.com
	

# Modify and deploy APP


1. Modify app.js for examble and change H1 (line 40) you can put "welcome me" for example
	
2. Build the Image with diferent TAG

    docker build -t gcr.io/${PROJECT_ID}/sample-app:v2 .
	
3. Push the Image to GCR
	
    docker -- push gcr.io/${PROJECT_ID}/sample-app:v2
	
4. Modify the "image" line 17 of deployment.yaml with the correct v[X]
	
	image: gcr.io/${PROJECT_ID}/sample-app:v2

5. Apply Deploy
		
	kubectl apply -f deployment.yaml

Kubernetes will perform a rolling update of your application, replacing the old Pods with new Pods running the updated Docker image.
This process ensures minimal downtime and maintains the availability of your application during the update.

After the update is complete, you can test your app using the same external IP address or domain name as before.
The changes you made to the code should now be reflected in the running application.

Remember that you don't need to delete or update the existing service or ingress resources unless you have made changes to their configurations as well.


# Delete all cluster pods IP and repositories


1. Delete SSL:

    a. If you used a managed certificate, find the certificate name and delete it:

        kubectl get managedcertificate
        kubectl delete managedcertificate <your-certificate-name>

    b. If you used a Kubernetes secret to store your SSL certificates, find the secret name and delete it:

        kubectl get secrets
        kubectl delete secret <your-secret-name>

2. Delete deployments and services:

    a. Delete the service:

        kubectl delete svc <your-service-name>

    b. Delete the deployment:

        kubectl delete deployment <your-deployment-name>

3. Delete images on GCR:

    a. List the images:

        gcloud container images list --repository=gcr.io/<your-project-id>

    b. Delete the image:

        gcloud container images delete gcr.io/<your-project-id>/<your-image-name>:<your-image-tag> --force-delete-tags

4. Delete Kubernetes cluster:

    a. Delete the cluster:

        gcloud container clusters delete my-cluster --zone=<your-zone>

5. Delete IP static:

    a. Get the reserved static IP name:

        gcloud compute addresses list

    b. Delete the reserved static IP:

        gcloud compute addresses delete <your-static-ip-name> --region=<your-region>

6. Additional cleanup:

    a. If you created any additional resources (e.g., ConfigMaps, Persistent Volumes, or Persistent Volume Claims), make sure to delete them as well:

        kubectl delete configmap <your-configmap-name>
        kubectl delete pv <your-persistent-volume-name>
        kubectl delete pvc <your-persistent-volume-claim-name>

    b. If you created any additional namespaces, delete them:

        kubectl delete namespace <your-namespace>

Remember to replace <your-*> placeholders with the actual names and IDs of your resources.

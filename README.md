# DevOps Microservices Platform

A complete cloud-ready platform featuring:
- Multi-service Kubernetes deployment (Node.js, Python, etc.)
- GitOps with Argo CD
- Real-time monitoring with Prometheus & Grafana
- Portable, modular, and easy to extend for any app stack

---

## Features

- **Polyglot Services:** Easily add Node.js, Python, or other languages
- **Declarative Infrastructure:** All infra and app configs tracked in Git
- **GitOps:** Argo CD keeps your cluster in sync with your main branch
- **CI/CD Automation:** Docker images are rebuilt and pushed on every commit
- **Observability:** Out-of-the-box dashboards for cluster & app monitoring using Helm, Prometheus, and Grafana

---

## Quick Start

### 1. Prerequisites

- [Docker Desktop](https://docs.docker.com/desktop/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [minikube](https://minikube.sigs.k8s.io/docs/)
- [Helm](https://helm.sh/docs/intro/install/)
- [Git Bash](https://gitforwindows.org/) (Windows users)

---

### 2. Clone the Repository

git clone https://github.com/Hemantdeshwal/devops-microservices-platform.git
cd devops-microservices-platform

text

---

### 3. Start Minikube & Set kubectl Context

minikube start --cpus=2 --memory=4096
kubectl config use-context minikube

text

---

### 4. Install Argo CD

kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl port-forward svc/argocd-server -n argocd 8080:443 &

text

- Open [https://localhost:8080](https://localhost:8080) in your browser
- Default username: `admin`
- Get initial password:
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d && echo

text

---

### 5. Set Up Monitoring (Prometheus & Grafana via Helm)

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
kubectl create namespace monitoring
helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring
kubectl port-forward svc/monitoring-grafana -n monitoring 5300:80 &

text

- Access Grafana at [http://localhost:5300](http://localhost:5300)
  - Username: `admin`
  - Password: 
    ```
    kubectl get secret --namespace monitoring monitoring-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo
    ```

---

### 6. Deploy Apps via GitOps

- All Kubernetes manifests are under `k8s/manifests/`
- Argo CD Application manifests are in `k8s/argo-apps/`
- Committing & pushing changes triggers auto-deployments and syncs

---

### 7. CI/CD Workflow

- Docker images are auto-built and pushed to Docker Hub via [GitHub Actions](.github/workflows/docker-build-push.yml)
- On every `main` branch push (to service folders), CI will build/push images using secrets (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`)
- Change the deployment image tag in YAML and Argo CD will update your running pods automatically


### 8. Accessing the Apps

Use Minikube to get app URLs:
minikube service service-a --url
minikube service service-b --url

Add more as you expand
text

Test endpoints with browser/curl/Postman, e.g. `/`, `/health`.

---

## Directory Structure

devops-microservices-platform/
README.md
services/
service-a/ # Node.js (Express)
service-b/ # Python (Flask)
...
k8s/
manifests/ # All deployment YAMLs
argo-apps/ # Argo CD Application manifests
.github/
workflows/ # GitHub Actions workflows

text

---

## Monitoring/Observability

- Grafana provides rich dashboards:
  - Kubernetes/Compute Resources/Cluster/Pod/node/etc.
- Prometheus scrapes metrics for your apps and cluster

---

## License

MIT © hemant deshwal

---

## Questions?

Open an issue or contact [hemantdeshwal6375@gmail.com](mailto:hemantdeshwal6375@gmail.com) or [https://github.com/Hemantdeshwal](https://github.com/Hemantdeshwal)

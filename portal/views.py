from django.http import HttpResponse
from django.shortcuts import render
from portal.models import MedicalFacility, MedicalProfessional
import requests
import json

# Create your views here.

API_KEY = "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"

def index(request):
    return render(request, "home.html")


def user_profile(request):
    return render(request, "profile.html")


def disease_detection(request):
    return render(request, "disease-detection.html")


def medical_facilities(request):
    facilities = MedicalFacility.objects.all()
    return render(request, "medical-facilities.html", {"facilities": facilities})


def medical_professionals(request):
    professionals = MedicalProfessional.objects.all()
    return render(request, "medical-professionals.html", {"professionals": professionals})


def medical_professional_details(request, medical_professional_id):
    professional = MedicalProfessional.objects.get(id=medical_professional_id)
    return render(request, "medical-professional-details.html", {"professional": professional})


def medical_facility_details(request, medical_facility_id):
    facility = MedicalFacility.objects.get(id=medical_facility_id)
    return render(request, "medical-facility-details.html", {"facility": facility})


def query(filename, api_url, headers):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.request("POST", api_url, headers=headers, data=data)
    return json.loads(response.content.decode("utf-8"))


def covid(request):  
    api_url = "https://api-inference.huggingface.co/models/1aurent/vit_small_patch16_224.medmae_CXR_mae_ft_COVIDx"
    headers = {"Authorization": f"Bearer {API_KEY}"}

    data = query("/Users/uday/Development/github/hc/portal/static/models/normal2.jpeg", api_url, headers)
    return render(request, "disease.html", {"disease": "Pneumonia", "Result": True})

def pneumonia(request):
    api_url = "https://api-inference.huggingface.co/models/nickmuchi/vit-finetuned-chest-xray-pneumonia"
    headers = {"Authorization": f"Bearer {API_KEY}"}

    data = query("/Users/uday/Development/github/hc/portal/static/models/pneumonia.jpeg", api_url, headers)
    return render(request, "disease.html", {"disease": "Pneumonia", "Result": True})
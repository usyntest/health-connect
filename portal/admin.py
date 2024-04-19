from django.contrib import admin
from .models import MedicalProfessional, MedicalFacility

# Register your models here.
admin.site.register(MedicalProfessional)
admin.site.register(MedicalFacility)

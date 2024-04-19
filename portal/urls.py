from . import views
from django.urls import path


urlpatterns = [
    path('', views.index, name='index'),
    path('disease/', views.disease_detection, name='disease-detection'),
    path('disease/covid/', views.covid, name='covid'),
    path('disease/pneumonia/', views.pneumonia, name='pneumonia'),
    path('medical-facilities/', views.medical_facilities, name='medical-facilities'),
    path('medical-professionals/', views.medical_professionals, name='medical-professionals'),
    path('medical-professional/<int:medical_professional_id>/', views.medical_professional_details,
         name='medical-professional-details'),
    path('medical-facility/<int:medical_facility_id>/', views.medical_facility_details, name='medical-facility-details'),
    path('user/profile/', views.user_profile, name='user-profile')
]

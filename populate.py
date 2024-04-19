import random
import os
import django

# Set up Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hc.settings')
django.setup()

# Now import your models
from portal.models import MedicalProfessional, MedicalFacility


# Function to generate random Indian names
def generate_indian_name():
    first_names = ['Aarav', 'Advik', 'Ayaan', 'Arjun', 'Vihaan', 'Vivaan', 'Kabir', 'Reyansh', 'Ishaan', 'Mohammed',
                   'Shaurya', 'Atharv', 'Aryan', 'Rudra', 'Aaryan']
    last_names = ['Sharma', 'Patel', 'Khan', 'Singh', 'Reddy', 'Thakur', 'Kumar', 'Joshi', 'Shah', 'Gupta', 'Verma',
                  'Malhotra', 'Chauhan', 'Agarwal', 'Goswami']
    return random.choice(first_names) + ' ' + random.choice(last_names)


# Function to generate random degrees
def generate_degrees():
    degrees_list = ['MBBS', 'MD', 'MS', 'DM', 'MCh', 'BDS', 'MDS', 'PhD']
    num_degrees = random.randint(1, 3)
    degrees = [random.choice(degrees_list) for _ in range(num_degrees)]
    return ', '.join(degrees)


# Function to generate random speciality
def generate_speciality():
    speciality_list = ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Gynecology', 'Pediatrics', 'Oncology',
                       'Psychiatry', 'Urology', 'ENT']
    return random.choice(speciality_list)


# Function to generate random gender
def generate_gender():
    return random.choice([True, False])  # True for Male, False for Female


# Function to generate random experience
def generate_experience():
    return random.randint(4, 20)


# Function to generate random verified status
def generate_verified():
    return True


# Function to generate random description
def generate_description():
    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in erat nibh. Pellentesque ac varius eros. Aliquam vitae ligula interdum, congue nisl in, pharetra tortor. Quisque vulputate neque eget diam sodales, nec mattis massa interdum.'


# Function to generate random medical facility
def generate_medical_facility():
    return MedicalFacility.objects.order_by('?').first()


def generate_image():
    items = [
        "https://media.licdn.com/dms/image/D4D03AQFLN6zvzzerjw/profile-displayphoto-shrink_800_800/0/1695790675403?e=2147483647&v=beta&t=dtIL-EluIsV-gv1c7r8rO7m9xY06dHeaU_LlTb4Amp4",
        "https://media.licdn.com/dms/image/D4D03AQEs9byHHzhuwQ/profile-displayphoto-shrink_800_800/0/1693701587512?e=2147483647&v=beta&t=Cnliivdmm3OBUSK_OARz40sP1tcp5nRB0FWRsMWaGjk",
        "https://media.licdn.com/dms/image/D5603AQEuKJomHZSjwA/profile-displayphoto-shrink_800_800/0/1639821815167?e=2147483647&v=beta&t=VEqXdBl7heX0LRq-vpaJwNAXfgz4tlZWwsysXxuQKf8",
        "https://media.licdn.com/dms/image/D5603AQE-B83YxWBANQ/profile-displayphoto-shrink_800_800/0/1669886589504?e=2147483647&v=beta&t=OlElXR-TPVGLCF5DtfmomRCnY2rzIDR1oEsNxfOIvCk",
        "https://media.licdn.com/dms/image/C4D03AQENSam4asz4CA/profile-displayphoto-shrink_800_800/0/1645336669434?e=2147483647&v=beta&t=p3SlWiiyH3FN_hZVtj0H6WuwRwZrn5VCX_BHkgHTaoc",
        "https://media.licdn.com/dms/image/C5603AQEf0Sqskb59MA/profile-displayphoto-shrink_800_800/0/1650379860323?e=2147483647&v=beta&t=9rQel4WPi2ViyE4Vem8n6mLItEM94DlIdP5isZJdhqE",
        "https://media.licdn.com/dms/image/D4D03AQHMcwucV4kzJQ/profile-displayphoto-shrink_800_800/0/1688918944330?e=2147483647&v=beta&t=7tpKmE9hL7HaYAEDx9M48PGXHZWEyu2MFV9ddpf15sg",
        "https://media.licdn.com/dms/image/D5603AQGKiM80CFzF6g/profile-displayphoto-shrink_800_800/0/1707302060553?e=2147483647&v=beta&t=LvbQY1ICfMyN-sngc88cyRL5nCSgLNMXix6wnanJERs",
        "https://media.licdn.com/dms/image/C5603AQEwqC26yhb4Zw/profile-displayphoto-shrink_800_800/0/1633898000190?e=2147483647&v=beta&t=h0RfVorQ9lYBq8YwSOyp6o6jrw1iq09GCC_pC3xLv84",
        "https://media.licdn.com/dms/image/D5603AQFvY5jh7mcS2Q/profile-displayphoto-shrink_800_800/0/1692469770071?e=2147483647&v=beta&t=ezdOxNFfLYU6n6uREZmxDu_xO-WPvd6-MpSZ9X2uz_c",
        "https://media.licdn.com/dms/image/C4E03AQFWuZiozA8Wmw/profile-displayphoto-shrink_800_800/0/1660576784802?e=2147483647&v=beta&t=SSTVqgalIE81h8C2J-gMwMGqw_i7nBZ73ckzQsofBwQ",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM5uwJWeK07c-KTcruyUwEZxq-BFFWUIo99A&usqp=CAU",
        "https://media.licdn.com/dms/image/C5603AQGS6c3c-adxfA/profile-displayphoto-shrink_800_800/0/1640689605009?e=2147483647&v=beta&t=Nc0nFrd9f1AD0PCYkunA3nYR-3lrxynqFQCq18fT9qU",
        "https://media.licdn.com/dms/image/D5603AQEKphZF9MkNJA/profile-displayphoto-shrink_800_800/0/1676019248801?e=2147483647&v=beta&t=gHopMDM1Ct4ryk1g6yJ7TdvxdeIej4NYCqXfihrPXaE",
        "https://media.licdn.com/dms/image/C4E03AQGhYEgrVsxDSg/profile-displayphoto-shrink_800_800/0/1623597852917?e=2147483647&v=beta&t=tjnvp23HbWXNCmgFzI_wz8TasIo7UBcKZrpuwoNudSA",
        "https://media.licdn.com/dms/image/C4D03AQEfqux2EmBjTw/profile-displayphoto-shrink_800_800/0/1656671394604?e=2147483647&v=beta&t=Rulgg0fYHGO39Ff-q12FONJHRDrKd7H2ZNc5nBsiJ8M",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYep8p5ndmXPTjYNsEnmeXlLen0EDK90u5zw&usqp=CAU",
        "https://media.licdn.com/dms/image/D5603AQE7pOpilyEhBA/profile-displayphoto-shrink_800_800/0/1707585228517?e=2147483647&v=beta&t=mh_0EdT7-nC9q0QLV6lSrBA_0AK_jRFSOesp7VXTUdU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHl7yzm2q8MpVbFIsU58A3BGyNmTS-pRuNQ&usqp=CAU",
        "https://media.licdn.com/dms/image/D5603AQFBg2ilM1uxzQ/profile-displayphoto-shrink_800_800/0/1703582674124?e=2147483647&v=beta&t=M6dWWca2Fi8veI3JCtUGh3BfCQUEqo6MP0CPWPauwfE"
    ]
    return random.choice(items)


# Function to populate the database
def populate_database(num_entries):
    for _ in range(num_entries):
        indian_name = generate_indian_name()
        degrees = generate_degrees()
        speciality = generate_speciality()
        image = generate_image()  # Add URL to image here
        gender = generate_gender()
        experience = generate_experience()
        verified = generate_verified()
        description = generate_description()
        medical_facility = generate_medical_facility()

        MedicalProfessional.objects.create(
            name=indian_name,
            degrees=degrees,
            image=image,
            gender=gender,
            experience=experience,
            speciality=speciality,
            verified=verified,
            description=description,
            medical_facility=medical_facility
        )


if __name__ == "__main__":
    # Set the number of entries to populate
    num_entries = 50  # Change this to the desired number of entries
    populate_database(num_entries)
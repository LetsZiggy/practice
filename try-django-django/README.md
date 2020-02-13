# Try Django

#### Guides

[Video Guide](https://www.youtube.com/playlist?list=PLEsfXFp6DpzTD1BD1aWNxS2Ep06vIkaeW) | [Repository](https://github.com/codingforentrepreneurs/Try-Django) | [Testing Tutorial](https://wsvincent.com/django-testing-tutorial/)

---

#### Setup

- Setup Django
	1. `cd <ROOT_FOLDER>`
	2. `mkdir django`
	3. `cd <ROOT_FOLDER>/django`
	4. `python -m venv venv`
	5. `source venv/bin/activate`
	6. `pip install -r requirements.txt`
	7. Create and edit `.env`
		- Use `.env.example` as example
	8. `python manage.py makemigrations`
	9. `python manage.py migrate`
	10. `python manage.py createsuperuser`

---

#### Run

- Django
	1. `cd <ROOT_FOLDER>/django`
	2. `source venv/bin/activate`
	3. `python manage.py runserver`

---

#### Testing

- Django
	1. `cd <ROOT_FOLDER>/django`
	2. `source venv/bin/activate`
	3. `python manage.py test`

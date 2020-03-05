import re

from django.test import SimpleTestCase
from django.urls import reverse


class PagesHomeViewTests(SimpleTestCase):
	def test_home_view(self):
		response = self.client.get(reverse("home"))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "home.html")
		self.assertContains(response, "HOME VIEW")
		self.assertContains(response, "Hello World!")


class PagesAboutViewTests(SimpleTestCase):
	def test_about_view(self):
		response = self.client.get(reverse("about"))
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "about.html")
		self.assertContains(response, "ABOUT VIEW")
		self.assertContains(response, "this is me")


class PagesContactViewTests(SimpleTestCase):
	def test_contact_view(self):
		response = self.client.get(reverse("contact"))
		content = response.content.decode("utf-8")
		self.assertEqual(response.status_code, 200)
		self.assertTemplateUsed(response, "contact.html")
		self.assertContains(response, "CONTACT VIEW")
		self.assertTrue(re.search(r"<li>[\s\n]+First[\s\n]+-[\s\n]+contact1[\s\n]+</li>", content))
		self.assertTrue(re.search(r"<li>[\s\n]+Last[\s\n]+-[\s\n]+contact5[\s\n]+</li>", content))

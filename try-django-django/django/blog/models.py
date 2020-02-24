from django.db import models
from django.urls import reverse


class Article(models.Model):
	title = models.CharField(max_length=120)
	author = models.CharField(max_length=120)
	created = models.DateTimeField(auto_now_add=True)
	revised = models.DateTimeField(auto_now=True)
	content = models.TextField()
	summary = models.TextField()
	publish = models.BooleanField()

	def get_absolute_url(self):
		return reverse("blog:detail", kwargs={"identifier": self.id})

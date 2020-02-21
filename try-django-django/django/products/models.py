from django.db import models
from django.urls import reverse


class Product(models.Model):
	title = models.CharField(max_length=120)
	description = models.TextField(blank=True, null=True)
	price = models.DecimalField(max_digits=16, decimal_places=2)
	summary = models.TextField()
	featured = models.BooleanField(default=False)

	def get_absolute_url(self):
		# return self.id
		return reverse("products:detail", kwargs={"identifier": self.id})

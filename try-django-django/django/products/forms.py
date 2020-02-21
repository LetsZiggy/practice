from django import forms

from .models import Product


class ProductForm(forms.ModelForm):
	title = forms.CharField(
		max_length=120,
		label="Item Title:",
		widget=forms.TextInput(
			attrs={
				"placeholder": "Title",
				"autofocus": True,
			}
		),
	)

	class Meta:
		model = Product
		fields = [
			"title",
			# "description",
			"price",
			"summary",
			# "featured",
		]

	def clean_title(self, *arg, **kwargs):
		title = self.cleaned_data.get("title")
		if not "item" in title:
			raise forms.ValidationError("Title requires 'item' prefix")
		return title


class RawProductForm(forms.Form):
	title = forms.CharField(
		max_length=120,
		label="Item Title:",
		widget=forms.TextInput(
			attrs={
				"placeholder": "Title",
			}
		),
	)
	# description = forms.CharField(required=False, widget=forms.Textarea())
	price = forms.DecimalField(max_digits=16, decimal_places=2)
	summary = forms.CharField(
		widget=forms.Textarea(
			attrs={
				"id": "summary-textarea",
				"class": "bg-grey-100",
				"rows": 5,
				"cols": 25,
			}
		)
	)
	# featured = forms.BooleanField(required=False)

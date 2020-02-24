from django import forms

from .models import Article


class ArticleForm(forms.ModelForm):
	title = forms.CharField(
		max_length=120,
		widget=forms.TextInput(
			attrs={
				"placeholder": "Title",
				"autofocus": True,
			}
		),
	)

	class Meta:
		model = Article
		fields = [
			"title",
			"author",
			# "created",
			# "revised",
			"content",
			"summary",
			"publish",
		]

	def clean_title(self, *arg, **kwargs):
		title = self.cleaned_data.get("title")
		if not "article" in title:
			raise forms.ValidationError("Title requires 'article' prefix")
		return title

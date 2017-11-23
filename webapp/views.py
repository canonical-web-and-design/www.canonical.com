"""
Django views for www.canonical.com.
"""
from django.views.generic.base import TemplateView
from django_template_finder_view import TemplateFinder

from webapp.templatetags.raw_feeds import get_raw_json_feed


class GreenhouseVacancies(TemplateView):
    template_name = "careers/all-vacancies.html"

    def get_vacancies(self):
        feed = get_raw_json_feed(
            'https://api.greenhouse.io/v1/boards/Canonical/jobs'
        )

        job_departments = {}
        job_count = 0

        for job in feed['jobs']:
            job_count = job_count + 1
            department = job['metadata'][0]['value']
            if department not in job_departments.keys():
                job_departments[department] = []

            job_departments[department].append({
                'title': job['title'],
                'url': job['absolute_url'],
                'location': job['location'],
            })
        import pprint
        pprint.pprint(job_departments)
        pprint.pprint(job_count)
        return job_departments, job_count

    def get_context_data(self, **kwargs):
        context = super(GreenhouseVacancies, self).get_context_data(**kwargs)
        jobs, job_count = self.get_vacancies()
        context['jobs'] = jobs
        context['job_count'] = job_count
        return context


class CanonicalTemplateFinder(TemplateFinder):
    """
    Local customisations of the shared django_template_finder_view.
    """

    def get_context_data(self, **kwargs):
        """
        Get context data fromt the database for the given page.
        """

        # Get any existing context
        context = super(CanonicalTemplateFinder, self).get_context_data(
            **kwargs
        )

        # Add job role
        context['job_id'] = self.request.GET.get('job_id')

        # Add level_* context variables
        clean_path = self.request.path.strip('/')
        for index, path, in enumerate(clean_path.split('/')):
            context["level_" + str(index + 1)] = path

        return context

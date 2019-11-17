from django.core.validators import RegexValidator


NAME_PATTERN = RegexValidator(
    regex=r'^[a-zA-Z]{3,}$',
    message='Podana nazwa jest nieprawidłowa. Nazwa może zawierać wyłącznie duże lub małe litery. Ich minimalna ilosć to 3.'
)

DETAILED_NAME_PATTERN = RegexValidator(
    regex=r'^\w{3,}$',
    message='Podana nazwa jest nieprawidłowa. Nazwa może zawierać wyłącznie litery i cyfry. Ich minimalna ilość to 3.'
)

PL_NUMBER_PLATE_PATTERN = RegexValidator(
    regex=r'^\w{1,3}\-\w{2,4}$',
    message='Podana nazwa jest nieprawidłowa. Nazwa może zawierać wyłącznie litery i cyfry. Ich minimalna ilość to 3.'
)

PHONE_NUMBER_PATTERN = RegexValidator(
    regex=r'^\d{3}\-\d{3}\-\d{3}$',
    message='Podany numer telefonu jest nieprawidłowy. Numer musi zostać wprowadzony w następującej formie 000-000 000'
)

POSTAL_CODE_PATTERN = RegexValidator(
    regex=r'^\d{2}\-\d{3}$',
    message='Podany kod pocztowy jest nieprawidłowy. Należy wprowadzić kod pocztowy w następującej formie 00-000.'
)

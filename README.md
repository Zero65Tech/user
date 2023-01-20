USER
| ID | name | image | email | password | totp | _ver |
|:--:|:----:|:-----:|:-----:|:--------:|:----:|:----:|
| auto-generated | { first, last } | { ID, url } | string | string | string | 1 |

USER_SESSION
| ID | user-id | last-active |
|:--:|:-------:|:-----------:|
| auto-generated | ID | timestamp |

**USER:**
| id | name | image | email | password | totp | timestamp | $ |
|:--:|:----:|:-----:|:-----:|:--------:|:----:|:---------:|:-:|
| `auto-generated` | { first, last } | { url } | `string` | `string` | `string` | { create, update } | { version: **1**, partition: **1 to 100** } |

<br/>

**USER_SESSION:**
| id | user | device | location | status | timestamp | $ |
|:--:|:----:|:-----:|:--------:|:------:|:---------:|:-:|
| `auto-generated` | { id } | { userAgent } | `object` | `enum` | `object` | { version: **1** } |

- location: `{ coords: { latitude, longitude, accuracy}, timestamp }`
- status:
  - `active` → `loggedin` → `loggedout`
  - `active` → `expired`, `blocked`
  - `loggedin` → `expired`, `blocked`
- timestamp: `{ create, login, logout, lastActive }`

terraform {
  backend "http" {
    address        = "http://localhost:8000/"
    lock_address   = "http://localhost:8000/lock"
    unlock_address = "http://localhost:8000/unlock"
  }
}

resource "random_string" "test" {
  length = 16
}

resource "random_string" "test1" {
  length = 16
}

output "value" {
  value = random_string.test.length
}

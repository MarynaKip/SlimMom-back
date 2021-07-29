class ServiceError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends ServiceError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAuthorized extends ServiceError {
  constructor(message) {
    super(message)
    this.status = 401
  }
}
class RegistrationConflictError extends ServiceError {
  constructor(message) {
    super(message)
    this.status = 409
  }
}

class NotFoundError extends ServiceError {
  constructor(message) {
    super(message)
    this.status = 404
  }
}

module.exports = {
  ServiceError,
  NotAuthorized,
  RegistrationConflictError,
  ValidationError,
  NotFoundError,
}

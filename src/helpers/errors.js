class ServiceError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class WrongParametersError extends ServiceError {
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

module.exports = {
  ServiceError,
  NotAuthorized,
  WrongParametersError,
  RegistrationConflictError
}

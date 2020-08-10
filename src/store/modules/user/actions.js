export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileBooking(date, provider_id, filter) {
  return {
    type: '@user/UPDATE_PROFILE_BOOKING',
    payload: { date, provider_id, filter },
  };
}

export function updateProfilefailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

export function updateDoctorProfileRequest(data) {
  return {
    type: '@user/UPDATE_DOCTOR_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateDoctorProfileSuccess(doctor) {
  return {
    type: '@user/UPDATE_DOCTOR_PROFILE_SUCCESS',
    payload: { doctor },
  };
}

export function updateDoctorProfilefailure() {
  return {
    type: '@user/UPDATE_DOCTOR_PROFILE_FAILURE',
  };
}

export function updateBookingRequest(Pagamento, Recepcionista, id) {
  return {
    type: '@user/UPDATE_BOOKING_REQUEST',
    payload: { Pagamento, Recepcionista, id },
  };
}

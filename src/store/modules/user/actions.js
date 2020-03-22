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

export function updateProfileBooking(date, provider_id) {
  return {
    type: '@user/UPDATE_PROFILE_BOOKING',
    payload: { date, provider_id },
  };
}

export function updateProfilefailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

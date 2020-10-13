"use strict";

function canViewProfile(person, profile) {
  return person.role === 'admin' || person.id === profile.person.id;
}

function scopedProfile(person, profiles) {
  if (person.role === 'admin') return profiles;
  return profiles.filter(function (profile) {
    return profile.person.id === person.id;
  });
}

function canAddProfile(person, profile) {
  return person.role === 'admin';
}

module.exports = {
  canViewProfile: canViewProfile,
  scopedProfile: scopedProfile,
  canAddProfile: canAddProfile
};
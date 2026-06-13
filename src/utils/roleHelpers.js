const ROLE_BADGE_COLORS = {
  admin: 'danger',
  user: 'success',
}

export function getRoleBadgeColor(role) {
  return ROLE_BADGE_COLORS[role] || 'secondary'
}

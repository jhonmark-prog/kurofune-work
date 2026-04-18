import { Colors } from '../constants/colors';

type ApplicationStatus = 'Pending' | 'Sent' | 'Accepted' | 'Rejected';

export function getStatusColor(status: ApplicationStatus) {
  return {
    Pending: { text: Colors.statusPending, bg: Colors.backgroundSecondary },
    Sent:     { text: Colors.statusSent,    bg: Colors.warningBg },
    Accepted: { text: Colors.statusAccepted, bg: Colors.successBg },
    Rejected: { text: Colors.statusRejected, bg: Colors.dangerBg },
  }[status];
}
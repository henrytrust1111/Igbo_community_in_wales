import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CalendarPlus,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
  CircleHelp,
  GraduationCap,
  Globe,
  HandHeart,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  Network,
  PartyPopper,
  Phone,
  Quote,
  Send,
  Shield,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'

type MaterialIconProps = {
  name: string
  className?: string
}

const icons: Record<string, LucideIcon> = {
  alternate_email: Mail,
  arrow_forward: ArrowRight,
  calendar_add_on: CalendarPlus,
  calendar_month: CalendarDays,
  call: Phone,
  campaign: Megaphone,
  celebration: PartyPopper,
  check_circle: CheckCircle,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  close: X,
  diversity_3: Users,
  event: CalendarDays,
  event_note: CalendarDays,
  festival: PartyPopper,
  format_quote: Quote,
  globe: Globe,
  group_add: Users,
  groups: Users,
  help: CircleHelp,
  history_edu: BookOpen,
  hub: Network,
  location_on: MapPin,
  mail: Mail,
  menu: Menu,
  phone: Phone,
  psychology: Sparkles,
  school: GraduationCap,
  send: Send,
  shield: Shield,
  volunteer_activism: HandHeart,
}

export function MaterialIcon({ name, className }: MaterialIconProps) {
  const Icon = icons[name] ?? Landmark

  return <Icon aria-hidden="true" className={className} strokeWidth={2} />
}

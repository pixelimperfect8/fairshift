"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics01Icon,
  ArrowDown01Icon,
  Download01Icon,
  File01Icon,
  Flag02Icon,
  InboxIcon,
  Location01Icon,
  Settings01Icon,
  UserGroupIcon,
  Wrench01Icon,
} from "@hugeicons/core-free-icons"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Block, Example, Section } from "./kit"
import { StateMatrix, previewState } from "./state-matrix"

// Components that are themselves a filled panel (cards, tab lists, avatars) or
// that show hover with the muted fill sit straight on the page, the way they
// do in the product. The default Example frame uses the same fill and would
// hide them.
// examples used to sit on a grey panel and needed moving to the page colour; the frame is the page colour now
const onPage = ""

// Links in the examples go nowhere; keep the page where it is.
const stay = (event: React.MouseEvent) => event.preventDefault()

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

const fixLog = [
  {
    flag: "Missed meal break",
    location: "Midtown",
    action: "Added a second closer on Fridays so breaks can be covered",
    by: "Maria Delgado",
    when: "Nov 18",
    status: "Fixed",
  },
  {
    flag: "Overtime missing",
    location: "Fair Oaks",
    action: "Paid 2.5 hours of overtime on an off-cycle check",
    by: "Marcus Reed",
    when: "Nov 17",
    status: "Fixed",
  },
  {
    flag: "Walk-in door latch",
    location: "Elk Grove",
    action: "Repair booked with the refrigeration contractor",
    by: "Priya Shah",
    when: "Nov 16",
    status: "Open",
  },
  {
    flag: "Missed meal break",
    location: "Elk Grove",
    action: "Waiting on the manager's reply",
    by: "Priya Shah",
    when: "Nov 16",
    status: "Urgent",
  },
] as const

const statusVariant = {
  Fixed: "secondary",
  Open: "outline",
  Urgent: "destructive",
} as const

const roster = [
  {
    name: "Ana Lopez",
    initials: "AL",
    mobile: "(916) 555-0142",
    language: "Spanish",
    location: "Midtown",
    manager: "Maria Delgado",
  },
  {
    name: "Tuan Nguyen",
    initials: "TN",
    mobile: "(916) 555-0117",
    language: "Vietnamese",
    location: "Fair Oaks",
    manager: "Marcus Reed",
  },
  {
    name: "Devon Carter",
    initials: "DC",
    mobile: "(916) 555-0163",
    language: "English",
    location: "Elk Grove",
    manager: "Priya Shah",
  },
  {
    name: "Rosa Jimenez",
    initials: "RJ",
    mobile: "(916) 555-0128",
    language: "Spanish",
    location: "Midtown",
    manager: "Maria Delgado",
  },
  {
    name: "Kevin Tran",
    initials: "KT",
    mobile: "(916) 555-0185",
    language: "English",
    location: "Fair Oaks",
    manager: "Marcus Reed",
  },
  {
    name: "Imani Brooks",
    initials: "IB",
    mobile: "(916) 555-0109",
    language: "English",
    location: "Elk Grove",
    manager: "Priya Shah",
  },
  {
    name: "Luis Herrera",
    initials: "LH",
    mobile: "(916) 555-0156",
    language: "Spanish",
    location: "Midtown",
    manager: "Maria Delgado",
  },
  {
    name: "Mei Lin",
    initials: "ML",
    mobile: "(916) 555-0171",
    language: "Cantonese",
    location: "Fair Oaks",
    manager: "Marcus Reed",
  },
] as const

const byLocation = [
  { location: "Midtown", texted: 14, replied: 13, flags: 1 },
  { location: "Fair Oaks", texted: 11, replied: 9, flags: 1 },
  { location: "Elk Grove", texted: 9, replied: 8, flags: 2 },
] as const

const responseRate = [
  { period: "Jul 31", rate: 62 },
  { period: "Aug 15", rate: 68 },
  { period: "Aug 31", rate: 71 },
  { period: "Sep 15", rate: 74 },
  { period: "Sep 30", rate: 79 },
  { period: "Oct 15", rate: 77 },
  { period: "Oct 31", rate: 84 },
  { period: "Nov 15", rate: 88 },
]

const responseRateConfig = {
  rate: { label: "Response rate", color: "var(--chart-1)" },
} satisfies ChartConfig

const rateByLocation = [
  { period: "Jul 31", midtown: 70, fairOaks: 58, elkGrove: 55 },
  { period: "Aug 15", midtown: 74, fairOaks: 64, elkGrove: 63 },
  { period: "Aug 31", midtown: 78, fairOaks: 66, elkGrove: 67 },
  { period: "Sep 15", midtown: 80, fairOaks: 70, elkGrove: 71 },
  { period: "Sep 30", midtown: 86, fairOaks: 73, elkGrove: 76 },
  { period: "Oct 15", midtown: 84, fairOaks: 72, elkGrove: 74 },
  { period: "Oct 31", midtown: 90, fairOaks: 80, elkGrove: 81 },
  { period: "Nov 15", midtown: 93, fairOaks: 82, elkGrove: 89 },
]

const rateByLocationConfig = {
  midtown: { label: "Midtown", color: "var(--chart-1)" },
  fairOaks: { label: "Fair Oaks", color: "var(--chart-2)" },
  elkGrove: { label: "Elk Grove", color: "var(--chart-3)" },
} satisfies ChartConfig

const flagsByType = [
  { type: "Meal break", open: 2, fixed: 5 },
  { type: "Overtime", open: 1, fixed: 3 },
  { type: "Safety", open: 1, fixed: 2 },
  { type: "Pay stub", open: 0, fixed: 4 },
]

const flagsByTypeConfig = {
  fixed: { label: "Fixed", color: "var(--chart-4)" },
  open: { label: "Open", color: "var(--chart-1)" },
} satisfies ChartConfig

const settingsTabs = [
  {
    value: "business",
    label: "Business",
    body: "Delgado's Kitchen LLC. Three locations in Sacramento County.",
  },
  {
    value: "locations",
    label: "Locations",
    body: "Midtown, Fair Oaks and Elk Grove. Each has its own manager.",
  },
  {
    value: "admins",
    label: "Admins",
    body: "Maria Delgado owns the account. Three managers can log fixes.",
  },
  {
    value: "languages",
    label: "Languages",
    body: "Check-ins go out in English, Spanish, Vietnamese and Cantonese.",
  },
  {
    value: "billing",
    label: "Billing",
    body: "Billed monthly per active employee. Next invoice on Dec 1.",
  },
] as const

const webhookPayload = `{
  "event": "flag.created",
  "pay_period": "2026-11-01/2026-11-15",
  "location": "Elk Grove",
  "flag": "Walk-in door latch",
  "language": "es",
  "reported_at": "2026-11-16T09:42:00-08:00"
}`

const exportCommand = `curl https://api.fairshift.example/v1/audit-packets \\
  -d pay_period=2026-11-15 \\
  -d format=pdf \\
  -o audit-packet-nov-15.pdf`

const importError = `Row 7: mobile "(916) 555-01" is not a valid number.
Row 12: language "Portugese" is not supported.
2 rows skipped. 32 employees imported.`

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export function Navigation() {
  return (
    <Section
      id="navigation"
      title="Navigation"
      intro="How an owner moves through the app: between views of one pay period, back up to the report, and across the fix log."
    >
      <Block
        name="Tabs"
        when="Switch between views of the same thing, such as one pay period. Not for moving between pages."
      >
        <Example title="Views of one pay period" className={onPage}>
          <Tabs defaultValue="report" className="w-full">
            <TabsList>
              <TabsTrigger value="report">Report</TabsTrigger>
              <TabsTrigger value="flags">Flags</TabsTrigger>
              <TabsTrigger value="fix-log">Fix log</TabsTrigger>
            </TabsList>
            <TabsContent value="report">
              <p className="max-w-[36rem] pt-2 type-small text-muted-foreground">
                34 employees were texted on Nov 15. 30 replied, and 4 raised a
                flag.
              </p>
            </TabsContent>
            <TabsContent value="flags">
              <p className="max-w-[36rem] pt-2 type-small text-muted-foreground">
                4 flags this period: two missed meal breaks, one overtime
                missing and one walk-in door latch.
              </p>
            </TabsContent>
            <TabsContent value="fix-log">
              <p className="max-w-[36rem] pt-2 type-small text-muted-foreground">
                2 of 4 flags are fixed. Each entry records the action taken, by
                whom and when.
              </p>
            </TabsContent>
          </Tabs>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Line, for tabs that sit on a hairline">
            <Tabs defaultValue="open">
              <TabsList variant="line">
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="fixed">Fixed</TabsTrigger>
                <TabsTrigger value="all">All flags</TabsTrigger>
              </TabsList>
            </Tabs>
          </Example>
          <Example title="With a leading icon" className={onPage}>
            <Tabs defaultValue="report">
              <TabsList>
                <TabsTrigger value="report">
                  <HugeiconsIcon
                    icon={Analytics01Icon}
                    strokeWidth={2}
                    data-icon="inline-start"
                  />
                  Report
                </TabsTrigger>
                <TabsTrigger value="flags">
                  <HugeiconsIcon
                    icon={Flag02Icon}
                    strokeWidth={2}
                    data-icon="inline-start"
                  />
                  Flags
                </TabsTrigger>
                <TabsTrigger value="roster">
                  <HugeiconsIcon
                    icon={UserGroupIcon}
                    strokeWidth={2}
                    data-icon="inline-start"
                  />
                  Roster
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Example>
        </div>

        <Example title="Vertical, for settings" className={onPage}>
          <Tabs
            defaultValue="business"
            orientation="vertical"
            className="w-full"
          >
            <TabsList>
              {settingsTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {settingsTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <p className="max-w-[30rem] px-4 py-2 type-small text-muted-foreground">
                  {tab.body}
                </p>
              </TabsContent>
            ))}
          </Tabs>
        </Example>

        <Example title="Trigger states" className={onPage}>
          <StateMatrix
            rows={["selected", "unselected"] as const}
            render={(row, state) => (
              <Tabs defaultValue="report">
                <TabsList>
                  <TabsTrigger
                    value="report"
                    {...(row === "selected" ? previewState(state) : {})}
                  >
                    Report
                  </TabsTrigger>
                  <TabsTrigger
                    value="flags"
                    {...(row === "unselected" ? previewState(state) : {})}
                  >
                    Flags
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          />
        </Example>
      </Block>

      <Block
        name="Breadcrumb"
        when="Show where a page sits and give a way back up. Use it from the second level down."
      >
        <Example title="A flag inside a pay period">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={stay}>
                  Reports
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={stay}>
                  Pay period ending Nov 15
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Missed meal break</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Example>
        <Example title="Middle levels collapsed">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={stay}>
                  Reports
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={stay}>
                  Elk Grove
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Walk-in door latch</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Example>
        <Example title="A long page name truncates, the path stays">
          <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem className="shrink-0">
                <BreadcrumbLink href="#" onClick={stay}>
                  Fix log
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="shrink-0">
                <BreadcrumbLink href="#" onClick={stay}>
                  Fair Oaks
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage className="max-w-[18rem] truncate">
                  Overtime missing from the Nov 15 check for the Saturday double
                  shift, paid on an off-cycle check
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Example>
      </Block>

      <Block
        name="Pagination"
        when="Page through a long list that has a known length, such as the fix log."
      >
        <Example title="A short fix log">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={stay} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={stay} isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={stay}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={stay}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={stay} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Example>
        <Example title="Two years of entries, with the middle elided">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={stay} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={stay}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {[12, 13, 14].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={stay}
                    isActive={page === 13}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={stay}>
                  48
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={stay} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Example>
        <Example title="Older and newer, when the count is not worth showing">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={stay}
                  text="Newer pay periods"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={stay}
                  text="Older pay periods"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Example>
      </Block>

      <Block
        name="Navigation menu"
        when="Top-level site navigation where a section needs a short panel of links. Open Report or Roster to see one."
      >
        <Example
          title="Owner's top navigation"
          className={`${onPage} items-start pb-64`}
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Report</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-80 gap-1">
                    {[
                      {
                        title: "This pay period",
                        body: "Nov 1 to Nov 15. 30 of 34 replied.",
                      },
                      {
                        title: "Past reports",
                        body: "Every pay period since you started.",
                      },
                      {
                        title: "Audit packet",
                        body: "Check-ins, flags and fixes in one PDF.",
                      },
                    ].map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink href="#" onClick={stay}>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">{link.title}</span>
                            <span className="text-muted-foreground">
                              {link.body}
                            </span>
                          </div>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Roster</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-64 gap-1">
                    {["Employees", "Locations", "Languages"].map((label) => (
                      <li key={label}>
                        <NavigationMenuLink href="#" onClick={stay}>
                          {label}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  onClick={stay}
                  className={navigationMenuTriggerStyle()}
                >
                  Fix log
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  onClick={stay}
                  className={navigationMenuTriggerStyle()}
                >
                  Settings
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Example>
      </Block>

      <Block
        name="Menubar"
        when="A row of menus for a dense working view, such as the report toolbar. Rare in this product."
      >
        <Example title="Report toolbar" className={onPage}>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Report</MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarItem>
                    Download audit packet
                    <MenubarShortcut>⌘D</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Print
                    <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>Email to your accountant</MenubarItem>
                </MenubarGroup>
                <MenubarSeparator />
                <MenubarGroup>
                  <MenubarItem variant="destructive">
                    Delete this report
                  </MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Flags</MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarLabel>Show</MenubarLabel>
                  <MenubarCheckboxItem defaultChecked>
                    Open flags
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem defaultChecked>
                    Fixed flags
                  </MenubarCheckboxItem>
                  <MenubarCheckboxItem>
                    Employees who did not reply
                  </MenubarCheckboxItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Location</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup defaultValue="all">
                  <MenubarRadioItem value="all">All locations</MenubarRadioItem>
                  <MenubarRadioItem value="midtown">Midtown</MenubarRadioItem>
                  <MenubarRadioItem value="fair-oaks">
                    Fair Oaks
                  </MenubarRadioItem>
                  <MenubarRadioItem value="elk-grove">
                    Elk Grove
                  </MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Example>
      </Block>

      <Block
        name="Sidebar"
        when="The app's main navigation. Five places, in the order an owner uses them on payday."
      >
        <Example
          title="Owner's app"
          className="items-stretch"
        >
          <SidebarProvider className="h-[30rem] min-h-0 min-w-[40rem]">
            <Sidebar collapsible="none">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                      <Avatar size="sm">
                        <AvatarFallback>DK</AvatarFallback>
                      </Avatar>
                      <span>Delgado&apos;s Kitchen</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>
                    Pay period ending Nov 15
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive>
                          <HugeiconsIcon
                            icon={Analytics01Icon}
                            strokeWidth={2}
                          />
                          <span>Report</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
                          <span>Flags</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>4</SidebarMenuBadge>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <HugeiconsIcon icon={Wrench01Icon} strokeWidth={2} />
                          <span>Fix log</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Your business</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
                          <span>Roster</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>34</SidebarMenuBadge>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <HugeiconsIcon
                            icon={Settings01Icon}
                            strokeWidth={2}
                          />
                          <span>Settings</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                      <Avatar size="sm">
                        <AvatarFallback>MD</AvatarFallback>
                      </Avatar>
                      <span>Maria Delgado</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset className="min-w-0">
              <div className="flex flex-col gap-6 p-[clamp(1.25rem,2.5vw,2rem)]">
                <div className="flex flex-col gap-2">
                  <h4 className="type-row">30 of 34 replied.</h4>
                  <p className="max-w-[28rem] type-small text-muted-foreground">
                    4 flags were raised this pay period. 2 are fixed and 2 are
                    still open.
                  </p>
                </div>
                <Separator />
                <ItemGroup className="gap-0">
                  {byLocation.map((row) => (
                    <Item key={row.location} size="sm" className="px-0">
                      <ItemContent>
                        <ItemTitle>{row.location}</ItemTitle>
                        <ItemDescription>
                          {row.replied} of {row.texted} replied
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Badge variant="outline">
                          {row.flags === 1 ? "1 flag" : `${row.flags} flags`}
                        </Badge>
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </Example>
      </Block>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* Data display                                                               */
/* -------------------------------------------------------------------------- */

export function DataDisplay() {
  return (
    <Section
      id="data-display"
      title="Data display"
      intro="How the product shows what happened on payday: who replied, what they flagged, and what was done about it."
    >
      <Block
        name="Card"
        when="An inset panel that groups one subject. A filled panel with no border, set straight on the page."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Pay-period summary" className={onPage}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Pay period ending Nov 15</CardTitle>
                <CardDescription>
                  Check-in sent Nov 15 at 5:00 pm to 34 employees.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="type-row">30 of 34 replied.</p>
                <p className="mt-2 type-small text-muted-foreground">
                  4 flags raised. 2 fixed, 2 open.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <HugeiconsIcon
                    icon={Download01Icon}
                    strokeWidth={2}
                    data-icon="inline-start"
                  />
                  Audit packet
                </Button>
              </CardFooter>
            </Card>
          </Example>
          <Example title="With an action in the header" className={onPage}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Walk-in door latch</CardTitle>
                <CardDescription>
                  Elk Grove. Reported Nov 16 in Spanish.
                </CardDescription>
                <CardAction>
                  <Badge variant="outline">Open</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="type-small">
                  &ldquo;The latch on the walk-in sticks from the inside. I had
                  to bang on the door on Tuesday.&rdquo;
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button>Log a fix</Button>
                <Button variant="ghost">Assign to manager</Button>
              </CardFooter>
            </Card>
          </Example>
        </div>
        <Example title="Small, for a row of figures" className={onPage}>
          <div className="grid w-full gap-3 sm:grid-cols-3">
            {byLocation.map((row) => (
              <Card key={row.location} size="sm">
                <CardHeader>
                  <CardDescription>{row.location}</CardDescription>
                  <CardTitle>
                    {row.replied} of {row.texted} replied
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Example>
      </Block>

      <Block
        name="Table"
        when="Records with the same fields, read across and compared down. The fix log and the roster are tables."
      >
        <Example title="Fix log" className={onPage}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flag</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Action taken</TableHead>
                <TableHead>By</TableHead>
                <TableHead>When</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fixLog.map((entry) => (
                <TableRow key={`${entry.flag}-${entry.location}`}>
                  <TableCell className="font-medium">{entry.flag}</TableCell>
                  <TableCell>{entry.location}</TableCell>
                  <TableCell className="max-w-[18rem] truncate">
                    {entry.action}
                  </TableCell>
                  <TableCell>{entry.by}</TableCell>
                  <TableCell className="tabular-nums">{entry.when}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[entry.status]}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Example>

        <Example title="With a caption and a totals row" className={onPage}>
          <Table>
            <TableCaption>
              Replies to the Nov 15 check-in, by location.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Texted</TableHead>
                <TableHead className="text-right">Replied</TableHead>
                <TableHead className="text-right">Flags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {byLocation.map((row) => (
                <TableRow key={row.location}>
                  <TableCell className="font-medium">{row.location}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.texted}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.replied}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.flags}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>All locations</TableCell>
                <TableCell className="text-right tabular-nums">34</TableCell>
                <TableCell className="text-right tabular-nums">30</TableCell>
                <TableCell className="text-right tabular-nums">4</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Example>

        <Example
          title="Roster, with a person in the first cell"
          className={onPage}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Manager</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roster.slice(0, 4).map((person) => (
                <TableRow key={person.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarFallback>{person.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{person.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="tabular-nums">
                    {person.mobile}
                  </TableCell>
                  <TableCell>{person.language}</TableCell>
                  <TableCell>{person.location}</TableCell>
                  <TableCell>{person.manager}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Example>

        <Example title="A long action truncates to one line" className={onPage}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flag</TableHead>
                <TableHead>Action taken</TableHead>
                <TableHead>By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Overtime missing</TableCell>
                <TableCell className="max-w-[20rem] truncate">
                  Checked the timecards against the schedule, found the Saturday
                  double shift was entered as two regular shifts, corrected both
                  entries and paid 2.5 hours of overtime on an off-cycle check
                  the same week
                </TableCell>
                <TableCell>Marcus Reed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Example>

        <Example title="No rows yet" className={onPage}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Flag</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Action taken</TableHead>
                <TableHead>By</TableHead>
                <TableHead>When</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="whitespace-normal">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
                      </EmptyMedia>
                      <EmptyTitle>No fixes logged yet</EmptyTitle>
                      <EmptyDescription>
                        When a flag comes in, log what you did about it here.
                        The fix log goes into your audit packet.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button variant="outline">See open flags</Button>
                    </EmptyContent>
                  </Empty>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Example>
      </Block>

      <Block
        name="Chart"
        when="A trend or a comparison the owner should see at a glance. Blue is the series that matters, ink and greys carry the rest."
      >
        <Example
          title="Response rate over the last eight pay periods"
          className={onPage}
        >
          <ChartContainer
            config={responseRateConfig}
            className="aspect-auto h-64 w-full"
          >
            <BarChart accessibilityLayer data={responseRate}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                width={44}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="rate" fill="var(--color-rate)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Example>

        <Example title="By location, with a legend" className={onPage}>
          <ChartContainer
            config={rateByLocationConfig}
            className="aspect-auto h-64 w-full"
          >
            <LineChart accessibilityLayer data={rateByLocation}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                domain={[40, 100]}
                tickLine={false}
                axisLine={false}
                width={44}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="midtown"
                type="monotone"
                stroke="var(--color-midtown)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="fairOaks"
                type="monotone"
                stroke="var(--color-fairOaks)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="elkGrove"
                type="monotone"
                stroke="var(--color-elkGrove)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </Example>

        <Example title="Stacked, flags by type since August" className={onPage}>
          <ChartContainer
            config={flagsByTypeConfig}
            className="aspect-auto h-56 w-full"
          >
            <BarChart accessibilityLayer data={flagsByType} layout="vertical">
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <YAxis
                dataKey="type"
                type="category"
                tickLine={false}
                axisLine={false}
                width={84}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="fixed"
                stackId="flags"
                fill="var(--color-fixed)"
                radius={[4, 0, 0, 4]}
              />
              <Bar
                dataKey="open"
                stackId="flags"
                fill="var(--color-open)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        </Example>
      </Block>

      <Block
        name="Item"
        when="One thing in a list with a title, a line of detail and an action. Lighter than a card, richer than a table row."
      >
        <Example title="A flag, with its action">
          <Item>
            <ItemMedia variant="icon">
              <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Missed meal break</ItemTitle>
              <ItemDescription>
                Midtown. Reported Nov 16 by a line cook on the closing shift.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                Log a fix
              </Button>
            </ItemActions>
          </Item>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Outline, when it stands alone">
            <Item variant="outline">
              <ItemMedia variant="icon">
                <HugeiconsIcon icon={File01Icon} strokeWidth={2} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Audit packet, Nov 15</ItemTitle>
                <ItemDescription>PDF, 12 pages</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon-sm" aria-label="Download">
                  <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
                </Button>
              </ItemActions>
            </Item>
          </Example>
          <Example title="Muted, for a quiet note" className={onPage}>
            <Item variant="muted">
              <ItemMedia variant="icon">
                <HugeiconsIcon icon={Location01Icon} strokeWidth={2} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Elk Grove pays weekly</ItemTitle>
                <ItemDescription>
                  Its check-in goes out every Friday at 5:00 pm.
                </ItemDescription>
              </ItemContent>
            </Item>
          </Example>
        </div>

        <Example title="A group of people, small, divided by hairlines">
          <ItemGroup className="gap-0">
            {roster.slice(0, 3).map((person, index) => (
              <React.Fragment key={person.name}>
                {index > 0 && <ItemSeparator className="my-0" />}
                <Item size="sm" className="px-0">
                  <ItemMedia>
                    <Avatar>
                      <AvatarFallback>{person.initials}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{person.name}</ItemTitle>
                    <ItemDescription>
                      {person.location}. Texts in {person.language}.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <span className="type-small text-muted-foreground tabular-nums">
                      {person.mobile}
                    </span>
                  </ItemActions>
                </Item>
              </React.Fragment>
            ))}
          </ItemGroup>
        </Example>

        <Example title="A long title holds to one line, the detail to two">
          <Item variant="outline" className="max-w-[30rem]">
            <ItemContent>
              <ItemTitle>
                Overtime missing from the Nov 15 check for the Saturday double
                shift at Fair Oaks
              </ItemTitle>
              <ItemDescription>
                The employee worked 10.5 hours on Saturday Nov 8. The timecard
                shows two regular shifts of 5 hours and 5.5 hours, so no
                overtime was calculated. Marcus is correcting both entries and
                will pay the difference on an off-cycle check.
              </ItemDescription>
            </ItemContent>
          </Item>
        </Example>
      </Block>

      <Block
        name="Avatar"
        when="A person on the roster or an admin. Initials stand in whenever there is no photo, which is most of the time."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Sizes" className={onPage}>
            <Avatar size="sm">
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </Example>
          <Example title="Photo missing, initials shown" className={onPage}>
            <Avatar size="lg">
              <AvatarImage
                src="/roster/maria-delgado-missing.jpg"
                alt="Maria Delgado"
              />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="type-label">Maria Delgado</span>
              <span className="type-small text-muted-foreground">
                Owner, Midtown
              </span>
            </div>
          </Example>
          <Example title="With a dot for a reply waiting" className={onPage}>
            <Avatar size="lg">
              <AvatarFallback>TN</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <div className="flex flex-col">
              <span className="type-label">Tuan Nguyen</span>
              <span className="type-small text-muted-foreground">
                Replied 5:12 pm
              </span>
            </div>
          </Example>
          <Example
            title="A group, with a count for the rest"
            className={onPage}
          >
            <AvatarGroup>
              {roster.slice(0, 4).map((person) => (
                <Avatar key={person.name}>
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+30</AvatarGroupCount>
            </AvatarGroup>
            <span className="type-small text-muted-foreground">
              34 employees texted
            </span>
          </Example>
        </div>
      </Block>

      <Block
        name="Accordion"
        when="A set of questions or rows where reading one at a time is enough. One opens, the others close."
      >
        <Example title="What happens on payday">
          <Accordion defaultValue={["flag"]}>
            <AccordionItem value="flag">
              <AccordionTrigger>
                What happens when someone flags a missed meal break?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  You get the flag the same evening, in English, with the
                  location and the shift. The employee&apos;s name stays with
                  you and their manager.
                </p>
                <p>
                  Log what you did about it and it goes into the fix log for
                  that pay period.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="no-reply">
              <AccordionTrigger>
                What if an employee does not reply?
              </AccordionTrigger>
              <AccordionContent>
                Nothing is assumed. The report counts them as not replied, and
                they get the same check-in next payday.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="packet">
              <AccordionTrigger>What is in the audit packet?</AccordionTrigger>
              <AccordionContent>
                Every check-in sent, every reply, every flag and every fix for
                the pay period, in one PDF you can hand to your attorney.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Example>
        <Example title="Several open at once, with one row unavailable">
          <Accordion multiple defaultValue={["midtown", "fair-oaks"]}>
            <AccordionItem value="midtown">
              <AccordionTrigger>Midtown</AccordionTrigger>
              <AccordionContent>
                13 of 14 replied. One missed meal break, fixed Nov 18.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="fair-oaks">
              <AccordionTrigger>Fair Oaks</AccordionTrigger>
              <AccordionContent>
                9 of 11 replied. One overtime missing, fixed Nov 17.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="roseville" disabled>
              <AccordionTrigger>Roseville, opening in January</AccordionTrigger>
              <AccordionContent>No pay periods yet.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Example>
      </Block>

      <Block
        name="Collapsible"
        when="One section that can be tucked away, such as flags that are already fixed."
      >
        <Example title="Fixed flags, folded under the open ones">
          <Collapsible className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="type-label">2 open flags</span>
                <span className="type-small text-muted-foreground">
                  Walk-in door latch and a missed meal break, both at Elk Grove.
                </span>
              </div>
              <CollapsibleTrigger
                render={<Button variant="outline" size="sm" />}
              >
                2 fixed
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  strokeWidth={2}
                  data-icon="inline-end"
                />
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="flex flex-col gap-2 pt-2">
                <Separator />
                {fixLog
                  .filter((entry) => entry.status === "Fixed")
                  .map((entry) => (
                    <div
                      key={entry.flag}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-1"
                    >
                      <span className="type-label">{entry.flag}</span>
                      <span className="type-small text-muted-foreground">
                        {entry.action}. {entry.by}, {entry.when}.
                      </span>
                    </div>
                  ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Example>
      </Block>

      <Block
        name="Carousel"
        when="A few panels of the same kind where one at a time is enough, such as a location each."
      >
        <Example
          title="One location at a time"
          className="justify-center px-14"
        >
          <Carousel className="w-full max-w-[26rem] min-w-0">
            <CarouselContent>
              {byLocation.map((row) => (
                <CarouselItem key={row.location}>
                  <div className="flex flex-col gap-2 rounded-xl bg-background p-6">
                    <span className="type-small text-muted-foreground">
                      {row.location}
                    </span>
                    <span className="type-row">
                      {row.replied} of {row.texted} replied.
                    </span>
                    <span className="type-small text-muted-foreground">
                      {row.flags === 1
                        ? "1 flag this pay period."
                        : `${row.flags} flags this pay period.`}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Example>
        <Example
          title="Two in view, for past pay periods"
          className="justify-center px-14"
        >
          <Carousel opts={{ align: "start" }} className="w-full min-w-0">
            <CarouselContent>
              {responseRate
                .slice()
                .reverse()
                .map((entry) => (
                  <CarouselItem
                    key={entry.period}
                    className="sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="flex flex-col gap-1 rounded-xl bg-background p-5">
                      <span className="type-small text-muted-foreground">
                        Pay period ending {entry.period}
                      </span>
                      <span className="type-row tabular-nums">
                        {entry.rate}% replied
                      </span>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Example>
      </Block>

      <Block
        name="Scroll area"
        when="A list that is longer than the space it has, inside a panel that should not grow."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="A roster list in a fixed panel">
            <ScrollArea className="h-64 w-full rounded-lg bg-background">
              <div className="flex flex-col px-4 py-2">
                {roster.map((person, index) => (
                  <React.Fragment key={person.name}>
                    {index > 0 && <Separator />}
                    <div className="flex items-center justify-between gap-4 py-3">
                      <span className="type-label">{person.name}</span>
                      <span className="type-small text-muted-foreground">
                        {person.location}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </Example>
          <Example title="Sideways, for a row of pay periods">
            <ScrollArea className="w-full rounded-lg bg-background">
              <div className="flex w-max gap-6 p-4">
                {responseRate.map((entry) => (
                  <div key={entry.period} className="flex flex-col gap-1">
                    <span className="type-small whitespace-nowrap text-muted-foreground">
                      {entry.period}
                    </span>
                    <span className="type-row tabular-nums">{entry.rate}%</span>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Example>
        </div>
      </Block>

      <Block
        name="Resizable"
        when="Two panes the owner may want to rebalance, such as a list of flags beside the one being read. Drag the hairline."
      >
        <Example title="Flags beside the open flag" className="items-stretch">
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-64 w-full rounded-lg bg-background"
          >
            <ResizablePanel defaultSize="40%" minSize="25%">
              <div className="flex h-full flex-col gap-3 p-4">
                <span className="type-small text-muted-foreground">
                  Open flags
                </span>
                <span className="type-label">Walk-in door latch</span>
                <span className="type-small text-muted-foreground">
                  Missed meal break
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="60%" minSize="30%">
              <div className="flex h-full flex-col gap-2 p-4">
                <span className="type-label">Walk-in door latch</span>
                <p className="type-small text-muted-foreground">
                  Elk Grove. Reported Nov 16. Repair booked with the
                  refrigeration contractor for Nov 20.
                </p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Example>
        <Example title="Stacked, without a grip" className="items-stretch">
          <ResizablePanelGroup
            orientation="vertical"
            style={{ height: "16rem" }}
            className="h-64 w-full rounded-lg border"
          >
            <ResizablePanel defaultSize="55%" minSize="30%">
              <div className="flex h-full flex-col gap-2 p-4">
                <span className="type-label">Check-in sent</span>
                <p className="type-small text-muted-foreground">
                  Did you get all your breaks and all your pay this period?
                  Reply 1 for yes, 2 for no.
                </p>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="45%" minSize="20%">
              <div className="flex h-full flex-col gap-2 p-4">
                <span className="type-label">Reply</span>
                <p className="type-small text-muted-foreground">
                  2. I did not get my second break on Friday.
                </p>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Example>
      </Block>

      <Block
        name="Aspect ratio"
        when="Hold a shape for a photograph or a preview before it loads, so the page does not jump."
      >
        <Example
          title="The three shapes the product uses"
          className="items-start"
        >
          <div className="grid w-full gap-3 sm:grid-cols-3">
            {[
              { ratio: 16 / 9, name: "16:9", use: "Location photo" },
              { ratio: 4 / 3, name: "4:3", use: "Audit packet preview" },
              { ratio: 1, name: "1:1", use: "Roster photo" },
            ].map((shape) => (
              <AspectRatio
                key={shape.name}
                ratio={shape.ratio}
                className="rounded-lg bg-muted"
              >
                <div className="flex size-full flex-col justify-end gap-0.5 p-3">
                  <span className="type-label tabular-nums">{shape.name}</span>
                  <span className="type-small text-muted-foreground">
                    {shape.use}
                  </span>
                </div>
              </AspectRatio>
            ))}
          </div>
        </Example>
      </Block>

      <Block
        name="Separator"
        when="A hairline between things that belong together. The system divides with lines and space, not boxes."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Between rows">
            <div className="flex w-full flex-col gap-3">
              <div className="flex justify-between gap-4">
                <span className="type-label">Pay schedule</span>
                <span className="type-small text-muted-foreground">
                  1st and 15th
                </span>
              </div>
              <Separator />
              <div className="flex justify-between gap-4">
                <span className="type-label">Check-in time</span>
                <span className="type-small text-muted-foreground">
                  5:00 pm on payday
                </span>
              </div>
              <Separator />
              <div className="flex justify-between gap-4">
                <span className="type-label">Languages</span>
                <span className="type-small text-muted-foreground">
                  4 in use
                </span>
              </div>
            </div>
          </Example>
          <Example title="Upright, between figures on one line">
            <div className="flex items-center gap-4">
              <span className="type-small">34 texted</span>
              <Separator orientation="vertical" />
              <span className="type-small">30 replied</span>
              <Separator orientation="vertical" />
              <span className="type-small">4 flags</span>
            </div>
          </Example>
        </div>
      </Block>

      <Block
        name="Code block"
        when="Something to copy exactly: a webhook payload, an export command, an import error. Set in the same sans, with tabular figures."
      >
        <Example title="A webhook payload, with a title and copy">
          <CodeBlock className="bg-background">
            <CodeBlockHeader>
              <CodeBlockTitle>flag.created</CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton value={webhookPayload} />
              </CodeBlockActions>
            </CodeBlockHeader>
            <CodeBlockContent>{webhookPayload}</CodeBlockContent>
          </CodeBlock>
        </Example>
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Numbered lines, copy on hover">
            <CodeBlock className="bg-background">
              <CodeBlockActions>
                <CodeBlockCopyButton value={exportCommand} />
              </CodeBlockActions>
              <CodeBlockContent lineNumbers>{exportCommand}</CodeBlockContent>
            </CodeBlock>
          </Example>
          <Example title="A change to the roster file">
            <CodeBlock size="sm" className="bg-background">
              <CodeBlockHeader>
                <CodeBlockTitle>roster.csv</CodeBlockTitle>
              </CodeBlockHeader>
              <CodeBlockContent>
                <CodeBlockLine>name,mobile,language,location</CodeBlockLine>
                <CodeBlockLine>
                  Ana Lopez,(916) 555-0142,es,Midtown
                </CodeBlockLine>
                <CodeBlockLine variant="removed">
                  Kevin Tran,(916) 555-0185,en,Midtown
                </CodeBlockLine>
                <CodeBlockLine variant="added">
                  Kevin Tran,(916) 555-0185,en,Fair Oaks
                </CodeBlockLine>
                <CodeBlockLine variant="added">
                  Mei Lin,(916) 555-0171,yue,Fair Oaks
                </CodeBlockLine>
              </CodeBlockContent>
            </CodeBlock>
          </Example>
        </div>
        <Example title="An import that needs attention, wrapped">
          <CodeBlock variant="destructive" className="bg-background">
            <CodeBlockHeader>
              <CodeBlockTitle>Roster import</CodeBlockTitle>
            </CodeBlockHeader>
            <CodeBlockContent wrap>{importError}</CodeBlockContent>
          </CodeBlock>
        </Example>
      </Block>
    </Section>
  )
}

"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Csv01Icon,
  Delete02Icon,
  Download01Icon,
  FileUploadIcon,
  Flag02Icon,
  InboxIcon,
  InformationCircleIcon,
  Mic01Icon,
  MoreHorizontalIcon,
  Note01Icon,
  Pdf01Icon,
  RefreshIcon,
  SentIcon,
  Upload01Icon,
  UserGroupIcon,
  UserRemove01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

import { cn } from "@/lib/utils"

import { Block, Example, Section } from "./kit"

// In the light theme `muted` and `card` are the same grey, so anything with a
// muted surface (a progress track, a skeleton, an incoming bubble) is shown on
// paper with a hairline instead of on the default inset panel.
const paper = "border bg-background"

const NEXT_STEP =
  "Pay one hour of premium pay and check Saturday's schedule for back-to-back doubles."

/* -------------------------------------------------------------------------- */
/* Feedback                                                                   */
/* -------------------------------------------------------------------------- */

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export function Feedback() {
  return (
    <Section
      id="feedback"
      title="Feedback"
      intro="How the product tells an owner what happened. A flag is a plain sentence with a next step, and nothing counts as done until the fix is logged."
    >
      <Block
        name="Alert"
        when="A message that stays on the page until it stops being true. Use the destructive variant only for something urgent or broken."
      >
        <Example title="Typical" className={paper}>
          <Alert className="max-w-xl">
            <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} />
            <AlertTitle>The next check-in goes out Friday at 9:00 am</AlertTitle>
            <AlertDescription>
              42 people on the roster will get the payday text in their own
              language.
            </AlertDescription>
          </Alert>
        </Example>
        <Example title="Without an icon" className={paper}>
          <Alert className="max-w-xl">
            <AlertTitle>Fix logged</AlertTitle>
            <AlertDescription>
              Premium pay added to the Dec 4 check. Saturday doubles split.
            </AlertDescription>
          </Alert>
        </Example>
        <Example title="Destructive, for an urgent flag" className={paper}>
          <Alert variant="destructive" className="max-w-xl">
            <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
            <AlertTitle>Safety concern at Midtown kitchen</AlertTitle>
            <AlertDescription>
              The walk-in freezer door sticks from the inside. This alert was
              sent to the owner within the hour.
            </AlertDescription>
          </Alert>
        </Example>
        <Example title="With an action" className={paper}>
          <Alert variant="destructive" className="max-w-xl">
            <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
            <AlertTitle>The roster did not upload</AlertTitle>
            <AlertDescription>
              Row 14 has no mobile number. Fix the spreadsheet and upload it
              again.
            </AlertDescription>
            <AlertAction>
              <Button variant="outline" size="sm">
                Retry
              </Button>
            </AlertAction>
          </Alert>
        </Example>
      </Block>

      <Block
        name="Toast"
        when="A short confirmation of something the owner just did. It leaves on its own, so never use it for anything they must read."
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Example title="Success">
            <Button
              variant="outline"
              onClick={() =>
                toast.add({
                  type: "success",
                  title: "Fix logged",
                  description: "Missed meal break, Midtown kitchen.",
                })
              }
            >
              Mark fixed
            </Button>
          </Example>
          <Example title="Info">
            <Button
              variant="outline"
              onClick={() =>
                toast.add({
                  type: "info",
                  title: "Check-in scheduled",
                  description: "42 texts go out Friday at 9:00 am.",
                })
              }
            >
              Schedule check-in
            </Button>
          </Example>
          <Example title="Warning">
            <Button
              variant="outline"
              onClick={() =>
                toast.add({
                  type: "warning",
                  title: "3 texts were not delivered",
                  description: "Check the mobile numbers on the roster.",
                })
              }
            >
              Send reminder
            </Button>
          </Example>
          <Example title="Error">
            <Button
              variant="outline"
              onClick={() =>
                toast.add({
                  type: "error",
                  title: "The roster did not upload",
                  description: "Row 14 has no mobile number.",
                })
              }
            >
              Upload roster
            </Button>
          </Example>
          <Example title="Loading, then success">
            <Button
              variant="outline"
              onClick={() => {
                void toast.promise(wait(2200), {
                  loading: {
                    title: "Building the audit packet",
                    description: "Pay period 23, Rosa's Kitchen.",
                  },
                  success: {
                    title: "Audit packet ready",
                    description: "rosas-kitchen-2026-pay-period-23.pdf",
                  },
                  error: {
                    title: "The export did not finish",
                    description: "Try again in a minute.",
                  },
                })
              }}
            >
              <HugeiconsIcon
                icon={Download01Icon}
                strokeWidth={2}
                data-icon="inline-start"
              />
              Export PDF
            </Button>
          </Example>
          <Example title="With an undo action">
            <Button
              variant="outline"
              onClick={() =>
                toast.add({
                  title: "Joseph R. removed from the roster",
                  description: "He will not get the next payday text.",
                  actionProps: {
                    children: "Undo",
                    onClick: () =>
                      toast.add({
                        type: "success",
                        title: "Joseph R. is back on the roster",
                      }),
                  },
                })
              }
            >
              Remove from roster
            </Button>
          </Example>
        </div>
      </Block>

      <Block
        name="Progress"
        when="How far along something measurable is: answers in, rows imported. For work with no known length, use a spinner."
      >
        <Example title="Typical" className={paper}>
          <Progress value={64} className="w-full max-w-md">
            <ProgressLabel>Answers this pay period</ProgressLabel>
            <ProgressValue />
          </Progress>
        </Example>
        <Example title="With a count in place of a percentage" className={paper}>
          <Progress value={28} max={42} className="w-full max-w-md">
            <ProgressLabel>Importing the roster</ProgressLabel>
            <ProgressValue>{(_, value) => `${value ?? 0} of 42 people`}</ProgressValue>
          </Progress>
        </Example>
        <Example title="Complete" className={paper}>
          <Progress value={100} className="w-full max-w-md">
            <ProgressLabel>Audit packet</ProgressLabel>
            <ProgressValue />
          </Progress>
        </Example>
      </Block>

      <Block
        name="Spinner"
        when="Something is happening and we cannot say how long it will take. Put it inside the control that started the work."
      >
        <Example title="Alone, and beside a line of text">
          <Spinner />
          <span className="type-small flex items-center gap-2 text-muted-foreground">
            <Spinner />
            Sending 42 payday texts
          </span>
        </Example>
        <Example title="Inside a button while it works">
          <Button disabled>
            <Spinner data-icon="inline-start" />
            Logging the fix
          </Button>
          <Button variant="outline" disabled>
            <Spinner data-icon="inline-start" />
            Building the PDF
          </Button>
        </Example>
        <Example title="Larger, for a whole panel">
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </Example>
      </Block>

      <Block
        name="Skeleton"
        when="A placeholder in the shape of what is loading, so the page does not jump when the content arrives."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="A card while it loads" className={paper}>
            <div className="flex w-full max-w-sm flex-col gap-6 p-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-4 w-56" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-8 w-28" />
            </div>
          </Example>
          <Example title="The same card, loaded" className={paper}>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Missed meal break</CardTitle>
                <CardDescription>Midtown kitchen · 1 employee</CardDescription>
              </CardHeader>
              <CardContent>{NEXT_STEP}</CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Mark fixed
                </Button>
              </CardFooter>
            </Card>
          </Example>
          <Example title="An item while it loads" className={paper}>
            <Item className="max-w-sm">
              <ItemMedia>
                <Skeleton className="size-8 rounded-full" />
              </ItemMedia>
              <ItemContent>
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-44" />
              </ItemContent>
              <ItemActions>
                <Skeleton className="h-5 w-16" />
              </ItemActions>
            </Item>
          </Example>
          <Example title="The same item, loaded" className={paper}>
            <Item className="max-w-sm">
              <ItemMedia>
                <Avatar>
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Maria G.</ItemTitle>
                <ItemDescription>Midtown kitchen · Español</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="outline">Answered</Badge>
              </ItemActions>
            </Item>
          </Example>
        </div>
      </Block>

      <Block
        name="Empty"
        when="A list with nothing in it yet. Say why it is empty and, if there is one, give the single next thing to do."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Nothing to act on" className={paper}>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon icon={InboxIcon} strokeWidth={2} />
                </EmptyMedia>
                <EmptyTitle>No open flags</EmptyTitle>
                <EmptyDescription>
                  Nothing was flagged this pay period. Clean check-ins go
                  straight to the record.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline">
                  <HugeiconsIcon
                    icon={Download01Icon}
                    strokeWidth={2}
                    data-icon="inline-start"
                  />
                  Export PDF
                </Button>
              </EmptyContent>
            </Empty>
          </Example>
          <Example title="First use, with one way forward" className={paper}>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />
                </EmptyMedia>
                <EmptyTitle>No one on the roster yet</EmptyTitle>
                <EmptyDescription>
                  Upload a spreadsheet with each person&apos;s name, mobile,
                  language, location and manager.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button>
                  <HugeiconsIcon
                    icon={Upload01Icon}
                    strokeWidth={2}
                    data-icon="inline-start"
                  />
                  Upload roster
                </Button>
              </EmptyContent>
            </Empty>
          </Example>
        </div>
      </Block>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* Overlays                                                                   */
/* -------------------------------------------------------------------------- */

function LogFixDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        Log a fix
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log a fix</DialogTitle>
          <DialogDescription>
            Missed meal break at Midtown kitchen. The flag closes once the fix
            is on the record.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fix-note">What did you do?</FieldLabel>
            <Textarea
              id="fix-note"
              defaultValue="Premium pay added to the Dec 4 check. Saturday doubles split."
            />
            <FieldDescription>
              This sentence goes into the audit packet with your name and the
              time.
            </FieldDescription>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button
            onClick={() => {
              setOpen(false)
              toast.add({
                type: "success",
                title: "Fix logged",
                description: "Missed meal break, Midtown kitchen.",
              })
            }}
          >
            Mark fixed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function RemoveEmployeeAlertDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <HugeiconsIcon
          icon={UserRemove01Icon}
          strokeWidth={2}
          data-icon="inline-start"
        />
        Remove from roster
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Joseph R. from the roster?</AlertDialogTitle>
          <AlertDialogDescription>
            He will stop getting payday texts from the next pay period. His
            past answers stay in the audit packet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep on roster</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              setOpen(false)
              toast.add({ title: "Joseph R. removed from the roster" })
            }}
          >
            Remove from roster
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function FlagSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open flag details
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Missed meal break</SheetTitle>
          <SheetDescription>Midtown kitchen · 1 employee</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-6">
          <div className="flex flex-col gap-1">
            <p className="type-label">What was said</p>
            <p className="type-small text-muted-foreground">
              Worked a double on Saturday. No meal break.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="type-label">Suggested next step</p>
            <p className="type-small text-muted-foreground">{NEXT_STEP}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="type-label">Open for</p>
            <p className="type-small text-muted-foreground">
              2 days. Reminders continue until the fix is logged.
            </p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>Mark fixed</SheetClose>
          <SheetClose render={<Button variant="outline" />}>
            Not now
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function RosterDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        <HugeiconsIcon
          icon={Upload01Icon}
          strokeWidth={2}
          data-icon="inline-start"
        />
        Upload roster
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-md flex-col gap-4">
          <DrawerHeader>
            <DrawerTitle>Upload a roster</DrawerTitle>
            <DrawerDescription>
              One spreadsheet, one row per person. We need five columns: name,
              mobile, language, location and manager.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <Attachment state="idle" className="w-full">
              <AttachmentMedia>
                <HugeiconsIcon icon={Csv01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>No spreadsheet chosen</AttachmentTitle>
                <AttachmentDescription>CSV or Excel, up to 5 MB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </div>
          <DrawerFooter>
            <Button>Choose a spreadsheet</Button>
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function SnoozePopover() {
  const [open, setOpen] = React.useState(false)

  function snooze(until: string) {
    setOpen(false)
    toast.add({ type: "info", title: `Reminder set for ${until}` })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        <HugeiconsIcon
          icon={Clock01Icon}
          strokeWidth={2}
          data-icon="inline-start"
        />
        Remind me later
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Remind me later</PopoverTitle>
          <PopoverDescription>
            The flag stays open. Pick when you want to hear about it again.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => snooze("tomorrow at 9:00 am")}
          >
            Tomorrow morning
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => snooze("Monday at 9:00 am")}
          >
            Monday
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => snooze("next payday")}
          >
            Next payday
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function FlagMenuItems() {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Missed meal break</DropdownMenuLabel>
        <DropdownMenuItem>
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
          Mark fixed
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
          Open flag details
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} />
            Remind me later
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Tomorrow morning</DropdownMenuItem>
              <DropdownMenuItem>Monday</DropdownMenuItem>
              <DropdownMenuItem>Next payday</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
          Export PDF
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive">
          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
          Dismiss flag
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}

function CommandInline({ defaultSearch = "" }: { defaultSearch?: string }) {
  // Controlled, starting on a value no item has, so cmdk does not scroll its
  // first item into view when the page loads.
  const [value, setValue] = React.useState("none")
  const [search, setSearch] = React.useState(defaultSearch)

  return (
    <Command
      value={value}
      onValueChange={setValue}
      label="Search FairShift"
      className="h-auto w-full max-w-md"
    >
      <CommandInput
        value={search}
        onValueChange={setSearch}
        placeholder="Search flags, people and actions"
      />
      <CommandList>
        <CommandEmpty>
          Nothing matches. Try a name, a location or an action.
        </CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem value="mark fixed">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
            Mark fixed
          </CommandItem>
          <CommandItem value="export pdf audit packet">
            <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
            Export PDF
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem value="upload roster">
            <HugeiconsIcon icon={Upload01Icon} strokeWidth={2} />
            Upload roster
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Open flags">
          <CommandItem value="missed meal break midtown kitchen">
            <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
            Missed meal break at Midtown kitchen
          </CommandItem>
          <CommandItem value="walk-in door latch midtown kitchen safety">
            <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
            Walk-in door latch at Midtown kitchen
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export function Overlays() {
  return (
    <Section
      id="overlays"
      title="Overlays"
      intro="Layers that sit above the page. They are the only surfaces in the system that take a shadow. Each one opens from a button that says what it opens."
    >
      <Block
        name="Dialog"
        when="A short task that needs an answer before the owner carries on, such as logging a fix."
      >
        <Example title="A focused task with one field">
          <LogFixDialog />
        </Example>
      </Block>

      <Block
        name="Alert dialog"
        when="A confirmation before something that cannot be undone from the same screen. Name the consequence, and label the button with the action."
      >
        <Example title="A destructive confirmation">
          <RemoveEmployeeAlertDialog />
        </Example>
      </Block>

      <Block
        name="Sheet"
        when="Detail about one thing in a list, opened from the side so the list stays in view behind it."
      >
        <Example title="The detail of one flag">
          <FlagSheet />
        </Example>
      </Block>

      <Block
        name="Drawer"
        when="A bottom panel for a short step on a phone. It can be swiped away."
      >
        <Example title="A short step, from the bottom of the screen">
          <RosterDrawer />
        </Example>
      </Block>

      <Block
        name="Popover"
        when="A small set of choices attached to the button that opened it. It does not block the page."
      >
        <Example title="A few choices on click">
          <SnoozePopover />
        </Example>
      </Block>

      <Block
        id="overlay-hover-card"
        name="Hover card"
        when="A preview of something a link points to. Nothing inside it should be the only way to reach anything."
      >
        <Example title="A preview on a link">
          <p className="type-small">
            Two kitchen staff at{" "}
            <HoverCard>
              <HoverCardTrigger
                href="#overlay-hover-card"
                className="text-accent-text underline underline-offset-4"
              >
                Midtown kitchen
              </HoverCardTrigger>
              <HoverCardContent align="start">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="type-label">Midtown kitchen</p>
                    <p className="text-muted-foreground">
                      14 people on the roster. Managed by Luis P.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">12 of 14 answered</Badge>
                    <Badge variant="outline">2 open flags</Badge>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{" "}
            said they missed meal breaks this period.
          </p>
        </Example>
      </Block>

      <Block
        name="Tooltip"
        when="The name of a control that has no visible label, or one short line about what a button will do."
      >
        <Example title="On an icon button, and on a labelled button">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Export PDF" />
              }
            >
              <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
            </TooltipTrigger>
            <TooltipContent>Export PDF</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" />}>
              Mark fixed
            </TooltipTrigger>
            <TooltipContent>
              Logs the fix and closes the flag
            </TooltipContent>
          </Tooltip>
        </Example>
      </Block>

      <Block
        name="Dropdown menu"
        when="The actions for one thing, behind one button. Put the destructive action last, on its own."
      >
        <Example title="Actions for one flag">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              <HugeiconsIcon
                icon={MoreHorizontalIcon}
                strokeWidth={2}
                data-icon="inline-start"
              />
              Flag actions
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <FlagMenuItems />
            </DropdownMenuContent>
          </DropdownMenu>
        </Example>
      </Block>

      <Block
        name="Context menu"
        when="The same actions on right-click or press and hold. Only ever a shortcut, never the only way."
      >
        <Example title="Right-click, or press and hold, the row" className={paper}>
          <ContextMenu>
            <ContextMenuTrigger className="w-full max-w-md">
              <Item variant="outline">
                <ItemMedia variant="icon">
                  <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Missed meal break at Midtown kitchen</ItemTitle>
                  <ItemDescription>
                    Right-click this row for its actions.
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuGroup>
                <ContextMenuLabel>Missed meal break</ContextMenuLabel>
                <ContextMenuItem>
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
                  Mark fixed
                </ContextMenuItem>
                <ContextMenuItem>
                  <HugeiconsIcon icon={ViewIcon} strokeWidth={2} />
                  Open flag details
                </ContextMenuItem>
                <ContextMenuItem>
                  <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
                  Export PDF
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                  Dismiss flag
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
        </Example>
      </Block>

      <Block
        name="Command"
        when="Search across flags, people and actions from the keyboard. Shown inline here; in the product it opens in a dialog."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          <Example title="Typical" className="items-start">
            <CommandInline />
          </Example>
          <Example title="Nothing matches" className="items-start">
            <CommandInline defaultSearch="overtime in Fresno" />
          </Example>
        </div>
      </Block>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* Conversation                                                               */
/* -------------------------------------------------------------------------- */

type Turn =
  | { kind: "marker"; id: string; label: string }
  | {
      kind: "message"
      id: string
      from: "fairshift" | "maria"
      texts: string[]
      header?: string
      footer?: string
      voiceNote?: boolean
    }

// The payday check-in as it reads on Maria's phone. Yes is 1, no is 2.
const thread: Turn[] = [
  { kind: "marker", id: "day", label: "Friday, 9:02 am" },
  {
    kind: "message",
    id: "intro",
    from: "fairshift",
    header: "FairShift for Rosa's Kitchen",
    texts: [
      "Hi Maria, it's payday at Rosa's Kitchen. 3 quick questions, totally optional, and your answers won't affect your pay.",
      "Did you get all your meal and rest breaks this pay period? Reply 1 for Yes, 2 for No.",
    ],
  },
  { kind: "message", id: "a1", from: "maria", texts: ["2"] },
  {
    kind: "message",
    id: "f1",
    from: "fairshift",
    texts: [
      "Sorry about that. What happened? A text or a voice note is fine, and it's optional.",
    ],
  },
  {
    kind: "message",
    id: "d1",
    from: "maria",
    texts: ["Worked a double on Saturday. No meal break."],
    voiceNote: true,
  },
  {
    kind: "message",
    id: "q2",
    from: "fairshift",
    texts: [
      "Thank you for telling us.",
      "Does your check look right, including overtime? Reply 1 for Yes, 2 for No.",
    ],
  },
  { kind: "message", id: "a2", from: "maria", texts: ["1"] },
  {
    kind: "message",
    id: "q3",
    from: "fairshift",
    texts: [
      "Is there anything at work that feels unsafe right now? Reply 1 for Yes, 2 for No.",
    ],
  },
  {
    kind: "message",
    id: "a3",
    from: "maria",
    texts: ["2"],
    footer: "Delivered 9:04 am",
  },
  {
    kind: "message",
    id: "done",
    from: "fairshift",
    texts: ["That's everything. Thanks, Maria. See you next payday."],
  },
  {
    kind: "marker",
    id: "end",
    label: "Check-in complete. Reply STOP at any time to opt out.",
  },
]

function ThreadTurn({ turn }: { turn: Turn }) {
  if (turn.kind === "marker") {
    return (
      <Marker variant="separator">
        <MarkerContent>{turn.label}</MarkerContent>
      </Marker>
    )
  }

  const mine = turn.from === "maria"
  const align = mine ? "end" : "start"

  return (
    <Message align={align}>
      <MessageContent>
        {turn.header && <MessageHeader>{turn.header}</MessageHeader>}
        {turn.texts.map((text) => (
          <Bubble key={text} variant={mine ? "default" : "muted"} align={align}>
            <BubbleContent>{text}</BubbleContent>
          </Bubble>
        ))}
        {turn.voiceNote && (
          <Attachment size="sm">
            <AttachmentMedia>
              <HugeiconsIcon icon={Mic01Icon} strokeWidth={2} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Voice note</AttachmentTitle>
              <AttachmentDescription>14 seconds · Español</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        )}
        {turn.footer && <MessageFooter>{turn.footer}</MessageFooter>}
      </MessageContent>
    </Message>
  )
}

function CheckInThread() {
  return (
    <div className="mx-auto h-[30rem] w-full max-w-md">
      <MessageScrollerProvider defaultScrollPosition="start">
        <MessageScroller>
          <MessageScrollerViewport aria-label="Payday check-in with Maria">
            <MessageScrollerContent className="gap-6 p-4">
              {thread.map((turn) => (
                <MessageScrollerItem key={turn.id} messageId={turn.id}>
                  <ThreadTurn turn={turn} />
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}

function LiveThread() {
  const start = 2
  const [count, setCount] = React.useState(start)
  const finished = count >= thread.length

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <div className="h-80 w-full">
        <MessageScrollerProvider autoScroll defaultScrollPosition="start">
          <MessageScroller>
            <MessageScrollerViewport aria-label="Payday check-in, one text at a time">
              <MessageScrollerContent className="gap-6 p-4">
                {thread.slice(0, count).map((turn) => (
                  <MessageScrollerItem
                    key={turn.id}
                    messageId={turn.id}
                    scrollAnchor={
                      turn.kind === "message" && turn.from === "maria"
                    }
                  >
                    <ThreadTurn turn={turn} />
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <div className="flex justify-end px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCount(finished ? start : count + 1)}
        >
          <HugeiconsIcon
            icon={finished ? RefreshIcon : SentIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          {finished ? "Start again" : "Send the next text"}
        </Button>
      </div>
    </div>
  )
}

const bubbleVariants = [
  {
    variant: "default",
    when: "The employee's reply. Always blue.",
    text: "Worked a double on Saturday. No meal break.",
  },
  {
    variant: "muted",
    when: "An incoming text from FairShift.",
    text: "Did you get all your meal and rest breaks this pay period? Reply 1 for Yes, 2 for No.",
  },
  {
    variant: "secondary",
    when: "A note from the owner, in ink.",
    text: "Premium pay added to the Dec 4 check. Saturday doubles split.",
  },
  {
    variant: "tinted",
    when: "A quieter blue, for a quoted reply.",
    text: "Overtime from last Sunday is missing.",
  },
  {
    variant: "outline",
    when: "An incoming text on a filled surface.",
    text: "Does your check look right, including overtime? Reply 1 for Yes, 2 for No.",
  },
  {
    variant: "ghost",
    when: "Long text with no surface, such as a summary.",
    text: "Two kitchen staff at the Midtown location said they missed meal breaks this period.",
  },
  {
    variant: "destructive",
    when: "A text that could not be delivered.",
    text: "Not delivered. This number cannot receive texts.",
  },
] as const

function CheckInQuestionnaire() {
  return (
    <Questionnaire
      className="max-w-md"
      onSubmit={(event) => {
        event.preventDefault()
        toast.add({
          type: "success",
          title: "That's everything. Thanks, Maria.",
          description: "See you next payday.",
        })
      }}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="breaks">
        <QuestionnaireTitle>
          Did you get all your meal and rest breaks this pay period?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Totally optional, and your answers won&apos;t affect your pay.
        </QuestionnaireDescription>
        <QuestionnaireChoices className="sm:grid-cols-2">
          <QuestionnaireChoice value="yes">Yes</QuestionnaireChoice>
          <QuestionnaireChoice value="no">No</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="pay">
        <QuestionnaireTitle>
          Does your check look right, including overtime?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          If something looks off, you can say what on the next step.
        </QuestionnaireDescription>
        <QuestionnaireChoices className="sm:grid-cols-2">
          <QuestionnaireChoice value="yes">Yes</QuestionnaireChoice>
          <QuestionnaireChoice value="no">No</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="safety">
        <QuestionnaireTitle>
          Is there anything at work that feels unsafe right now?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          A yes here goes to the owner within the hour.
        </QuestionnaireDescription>
        <QuestionnaireChoices className="sm:grid-cols-2">
          <QuestionnaireChoice value="yes">Yes</QuestionnaireChoice>
          <QuestionnaireChoice value="no">No</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious>Back</QuestionnairePrevious>
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit>Send answers</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}

function FollowUpQuestionnaire() {
  return (
    <Questionnaire
      className="max-w-md"
      onSubmit={(event) => {
        event.preventDefault()
        toast.add({ type: "success", title: "Thank you for telling us." })
      }}
    >
      <QuestionnaireItem name="what-happened">
        <QuestionnaireTitle>Sorry about that. What happened?</QuestionnaireTitle>
        <QuestionnaireDescription>
          A few words is fine, and it&apos;s optional.
        </QuestionnaireDescription>
        <QuestionnaireInput placeholder="Worked a double on Saturday. No meal break." />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSkip />
        <QuestionnaireSubmit>Send</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}

export function Conversation() {
  return (
    <Section
      id="conversation"
      title="Conversation"
      intro="The product is a text message, so the thread is the most important screen there is. FairShift speaks in a frosted tint. The employee always answers in blue."
    >
      <Block
        name="Message scroller"
        when="Any thread that scrolls. It keeps its own scroll position, follows new texts and offers a way back to the latest one."
      >
        <Example title="The payday check-in, as Maria sees it" className={cn(paper, "p-0")}>
          <CheckInThread />
        </Example>
        <Example
          title="Following the thread as each text arrives"
          className={cn(paper, "p-0")}
        >
          <LiveThread />
        </Example>
      </Block>

      <Block
        name="Message"
        when="One row of a thread: who said it, what they said and when. The employee's side is the end; everyone else is the start."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Incoming, with sender and time" className={paper}>
            <Message>
              <MessageContent>
                <MessageHeader>FairShift for Rosa&apos;s Kitchen</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Is there anything at work that feels unsafe right now?
                    Reply 1 for Yes, 2 for No.
                  </BubbleContent>
                </Bubble>
                <MessageFooter>9:03 am</MessageFooter>
              </MessageContent>
            </Message>
          </Example>
          <Example title="A reply, with its delivery time" className={paper}>
            <Message align="end">
              <MessageContent>
                <Bubble align="end">
                  <BubbleContent>
                    The walk-in freezer door sticks from the inside.
                  </BubbleContent>
                </Bubble>
                <MessageFooter>Delivered 9:04 am</MessageFooter>
              </MessageContent>
            </Message>
          </Example>
          <Example title="With an avatar, in the owner's fix log" className={paper}>
            <Message>
              <MessageAvatar>
                <Avatar>
                  <AvatarFallback>RD</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Rosa D.</MessageHeader>
                <Bubble variant="muted">
                  <BubbleContent>
                    Repair booked for Monday. Reminder set.
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </Example>
          <Example title="Two texts in a row from one sender" className={paper}>
            <MessageGroup className="w-full">
              <Message>
                <MessageContent>
                  <Bubble variant="muted">
                    <BubbleContent>Thank you for speaking up.</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
              <Message>
                <MessageContent>
                  <Bubble variant="muted">
                    <BubbleContent>
                      What feels unsafe? Optional.
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageGroup>
          </Example>
        </div>
        <Example title="A long reply wraps inside the bubble" className={paper}>
          <Message align="end">
            <MessageContent>
              <Bubble align="end">
                <BubbleContent>
                  Worked a double on Saturday because two people called out. I
                  asked for a break around three and was told to wait until the
                  rush was over, and then the dinner shift started.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </Example>
      </Block>

      <Block
        name="Bubble"
        when="The surface a text sits on. Pick the variant by who is speaking, not by how it looks."
      >
        <Example title="Variants" className={cn(paper, "flex-col items-stretch gap-5")}>
          {bubbleVariants.map((item) => (
            <div
              key={item.variant}
              className="grid items-center gap-x-6 gap-y-2 sm:grid-cols-[14rem_1fr]"
            >
              <p className="type-small text-muted-foreground">{item.when}</p>
              <Bubble variant={item.variant}>
                <BubbleContent>{item.text}</BubbleContent>
              </Bubble>
            </div>
          ))}
        </Example>
        <Example title="Stacked bubbles from one sender" className={paper}>
          <BubbleGroup className="w-full">
            <Bubble variant="muted">
              <BubbleContent>Thanks for telling us.</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>What looks off? Optional.</BubbleContent>
            </Bubble>
          </BubbleGroup>
        </Example>
        <Example title="On a dark band" dark>
          <div className="flex w-full max-w-md flex-col gap-2.5">
            <Bubble variant="muted">
              <BubbleContent>
                Did you get all your meal and rest breaks this pay period?
                Reply 1 for Yes, 2 for No.
              </BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>2</BubbleContent>
            </Bubble>
          </div>
        </Example>
      </Block>

      <Block
        name="Attachment"
        when="A file or a voice note in a thread or a form. It carries its own upload state, so there is no separate spinner."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Typical, with an action" className={paper}>
            <Attachment>
              <AttachmentMedia>
                <HugeiconsIcon icon={Pdf01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>
                  rosas-kitchen-2026-pay-period-23.pdf
                </AttachmentTitle>
                <AttachmentDescription>Audit packet · 1.2 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Download the audit packet">
                  <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </Example>
          <Example title="Nothing chosen yet" className={paper}>
            <Attachment state="idle">
              <AttachmentMedia>
                <HugeiconsIcon icon={FileUploadIcon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Add a roster spreadsheet</AttachmentTitle>
                <AttachmentDescription>CSV or Excel, up to 5 MB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </Example>
          <Example title="While it uploads" className={paper}>
            <Attachment state="uploading">
              <AttachmentMedia>
                <Spinner />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>roster-december.csv</AttachmentTitle>
                <AttachmentDescription>28 of 42 rows</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Cancel the upload">
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </Example>
          <Example title="While a voice note is transcribed" className={paper}>
            <Attachment state="processing">
              <AttachmentMedia>
                <HugeiconsIcon icon={Mic01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Voice note from Maria</AttachmentTitle>
                <AttachmentDescription>
                  Writing it out in English
                </AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </Example>
          <Example title="When the upload fails" className={paper}>
            <Attachment state="error">
              <AttachmentMedia>
                <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>roster-december.csv</AttachmentTitle>
                <AttachmentDescription>
                  Row 14 has no mobile number
                </AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Try the upload again">
                  <HugeiconsIcon icon={RefreshIcon} strokeWidth={2} />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </Example>
          <Example title="Sizes, smallest first" className={paper}>
            <Attachment size="xs">
              <AttachmentMedia>
                <HugeiconsIcon icon={Mic01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Voice note</AttachmentTitle>
              </AttachmentContent>
            </Attachment>
            <Attachment size="sm">
              <AttachmentMedia>
                <HugeiconsIcon icon={Mic01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Voice note</AttachmentTitle>
                <AttachmentDescription>14 seconds</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment>
              <AttachmentMedia>
                <HugeiconsIcon icon={Mic01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>Voice note</AttachmentTitle>
                <AttachmentDescription>14 seconds · Español</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </Example>
        </div>
        <Example title="Several in a row, with a long file name" className={paper}>
          <AttachmentGroup className="w-full">
            <Attachment className="max-w-64">
              <AttachmentMedia>
                <HugeiconsIcon icon={Pdf01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>
                  rosas-kitchen-2026-pay-period-23-audit-packet-with-consent-records.pdf
                </AttachmentTitle>
                <AttachmentDescription>PDF · 1.2 MB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment>
              <AttachmentMedia>
                <HugeiconsIcon icon={Csv01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>roster-december.csv</AttachmentTitle>
                <AttachmentDescription>42 rows</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
            <Attachment>
              <AttachmentMedia>
                <HugeiconsIcon icon={Note01Icon} strokeWidth={2} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>saturday-schedule.pdf</AttachmentTitle>
                <AttachmentDescription>PDF · 86 KB</AttachmentDescription>
              </AttachmentContent>
            </Attachment>
          </AttachmentGroup>
        </Example>
      </Block>

      <Block
        name="Marker"
        when="A line in a thread that nobody said: a date, a system note, the moment a fix was logged."
      >
        <Example title="A date between two days of texts" className={paper}>
          <Marker variant="separator">
            <MarkerContent>Friday, Nov 20</MarkerContent>
          </Marker>
        </Example>
        <Example title="A system note, with an icon" className={paper}>
          <Marker>
            <MarkerIcon>
              <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
            </MarkerIcon>
            <MarkerContent>
              Flag opened: missed meal break at Midtown kitchen
            </MarkerContent>
          </Marker>
        </Example>
        <Example title="A ruled note that closes a section" className={paper}>
          <Marker variant="border">
            <MarkerIcon>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
            </MarkerIcon>
            <MarkerContent>
              Fix logged by Rosa D. on Nov 21 at 4:12 pm
            </MarkerContent>
          </Marker>
        </Example>
        <Example title="With a link" className={paper}>
          <Marker>
            <MarkerIcon>
              <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
            </MarkerIcon>
            <MarkerContent>
              Maria answered in Spanish.{" "}
              <a href="#conversation">Read her own words</a>
            </MarkerContent>
          </Marker>
        </Example>
      </Block>

      <Block
        name="Trace"
        when="What FairShift did with a reply, one line per step. A line opens only when there is something behind it."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="A finished run" className={cn(paper, "items-start")}>
            <Trace>
              <TraceLine>
                <TraceIcon>
                  <HugeiconsIcon icon={Mic01Icon} strokeWidth={2} />
                </TraceIcon>
                <TraceTitle>Wrote out Maria&apos;s voice note</TraceTitle>
                <TraceDescription>14 s</TraceDescription>
              </TraceLine>
              <TraceCollapsible>
                <TraceCollapsibleTrigger>
                  <TraceLine>
                    <TraceIcon>
                      <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
                    </TraceIcon>
                    <TraceTitle>Checked Saturday&apos;s schedule</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent>
                  Maria worked 7:00 am to 3:00 pm and 4:00 pm to 11:00 pm at
                  Midtown kitchen. No meal break was recorded on either shift.
                </TraceCollapsibleContent>
              </TraceCollapsible>
              <TraceCollapsible>
                <TraceCollapsibleTrigger>
                  <TraceLine>
                    <TraceIcon>
                      <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
                    </TraceIcon>
                    <TraceTitle>Opened a flag with a next step</TraceTitle>
                  </TraceLine>
                </TraceCollapsibleTrigger>
                <TraceCollapsibleContent>{NEXT_STEP}</TraceCollapsibleContent>
              </TraceCollapsible>
            </Trace>
          </Example>
          <Example title="A run in progress" className={cn(paper, "items-start")}>
            <Trace>
              <TraceLine>
                <TraceIcon>
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
                </TraceIcon>
                <TraceTitle>Sent 42 payday texts</TraceTitle>
                <TraceDescription>9:02 am</TraceDescription>
              </TraceLine>
              <TraceLine status="running">
                <TraceIcon>
                  <Spinner />
                </TraceIcon>
                <TraceTitle>Reading 31 replies</TraceTitle>
              </TraceLine>
              <TraceLine status="pending">
                <TraceIcon>
                  <HugeiconsIcon icon={Note01Icon} strokeWidth={2} />
                </TraceIcon>
                <TraceTitle>Write the one-page report</TraceTitle>
              </TraceLine>
              <TraceLine status="pending">
                <TraceIcon>
                  <HugeiconsIcon icon={SentIcon} strokeWidth={2} />
                </TraceIcon>
                <TraceTitle>Send the report to Rosa</TraceTitle>
              </TraceLine>
            </Trace>
          </Example>
        </div>
        <Example title="A step that failed, with the reason behind it" className={cn(paper, "items-start")}>
          <Trace>
            <TraceCollapsible>
              <TraceCollapsibleTrigger>
                <TraceLine status="error">
                  <TraceIcon>
                    <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} />
                  </TraceIcon>
                  <TraceTitle>Could not deliver 3 texts</TraceTitle>
                </TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>
                Three mobile numbers on the roster cannot receive texts. They
                are listed on the report so you can correct them before the
                next payday.
              </TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
        </Example>
      </Block>

      <Block
        name="Questionnaire"
        when="The same check-in on a screen instead of by text: one question at a time, each one optional."
      >
        <Example title="The three check-in questions" className={cn(paper, "items-start")}>
          <CheckInQuestionnaire />
        </Example>
        <Example title="A follow-up with a written answer" className={cn(paper, "items-start")}>
          <FollowUpQuestionnaire />
        </Example>
      </Block>
    </Section>
  )
}

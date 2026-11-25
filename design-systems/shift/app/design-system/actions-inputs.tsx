"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Copy01Icon,
  Download01Icon,
  Flag02Icon,
  GridViewIcon,
  ListViewIcon,
  Search01Icon,
  SentIcon,
  Tick02Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons"
import type { DateRange } from "react-day-picker"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { DirectionProvider } from "@/components/ui/direction"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Block, Example, Section } from "./kit"
import { previewState, StateMatrix } from "./state-matrix"

// Content shared by the examples. All of it is FairShift's own domain.

const paySchedules = [
  { label: "Weekly", value: "weekly" },
  { label: "Every two weeks", value: "biweekly" },
  { label: "Twice a month", value: "semimonthly" },
  { label: "Monthly", value: "monthly" },
]

const locationItems = [
  { label: "Midtown", value: "midtown" },
  { label: "Fair Oaks", value: "fair-oaks" },
  { label: "Elk Grove", value: "elk-grove" },
]

const locationFilterItems = [
  { label: "All locations", value: "all" },
  ...locationItems,
]

const locations = ["Midtown", "Fair Oaks", "Elk Grove"]

const languages = [
  "English",
  "Español",
  "中文",
  "Tagalog",
  "Tiếng Việt",
  "한국어",
]

const breakQuestion =
  "Did you get all your meal and rest breaks this pay period?"

const payday = new Date(2026, 10, 27)
const payPeriod: DateRange = {
  from: new Date(2026, 10, 9),
  to: new Date(2026, 10, 22),
}

function PayScheduleSelect({
  defaultValue,
  ...props
}: React.ComponentProps<typeof SelectTrigger> & {
  defaultValue?: string
}) {
  return (
    <Select items={paySchedules} defaultValue={defaultValue}>
      <SelectTrigger {...props}>
        <SelectValue placeholder="Choose a pay schedule" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {paySchedules.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const buttonVariants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const

const buttonUses: {
  variant: (typeof buttonVariants)[number]
  label: string
  when: string
}[] = [
  {
    variant: "default",
    label: "Book a demo",
    when: "Primary. The one thing we want done on this view. Blue, and only once.",
  },
  {
    variant: "secondary",
    label: "Upload roster",
    when: "Secondary. A strong action on a view that has no primary, in ink.",
  },
  {
    variant: "outline",
    label: "Export PDF",
    when: "Quiet. The second action beside a primary. A tint, not a border.",
  },
  {
    variant: "ghost",
    label: "Skip for now",
    when: "Ghost. Low-stakes actions in toolbars and rows.",
  },
  {
    variant: "destructive",
    label: "Remove employee",
    when: "Destructive. Removing people or data. Product screens only.",
  },
  {
    variant: "link",
    label: "Read the fix log",
    when: "Link. An action that reads as part of a sentence.",
  },
]

const badgeVariants = [
  "default",
  "secondary",
  "outline",
  "destructive",
  "ghost",
  "link",
] as const

export function Actions() {
  return (
    <Section
      id="actions"
      title="Actions"
      intro="Things people press. Blue means act here, so each view gets one blue button and everything beside it is quieter."
    >
      <Block
        name="Button"
        when="Starts an action. Squared, 44px tall, 52px for marketing calls to action."
      >
        <Example title="A call to action with a quiet second action">
          <Button size="lg">
            Book a demo
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              data-icon="inline-end"
            />
          </Button>
          <Button size="lg" variant="outline">
            See a sample check-in
          </Button>
        </Example>

        <Example
          title="Variants, in the order to reach for them"
          className="flex-col items-stretch"
        >
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-[minmax(11rem,auto)_1fr] sm:items-center">
            {buttonUses.map((use) => (
              <React.Fragment key={use.variant}>
                <div>
                  <Button variant={use.variant}>{use.label}</Button>
                </div>
                <p className="type-small text-muted-foreground">{use.when}</p>
              </React.Fragment>
            ))}
          </div>
        </Example>

        <Example title="Sizes: extra small, small, default, large">
          <Button variant="secondary" size="xs">
            Mark fixed
          </Button>
          <Button variant="secondary" size="sm">
            Mark fixed
          </Button>
          <Button variant="secondary">Mark fixed</Button>
          <Button variant="secondary" size="lg">
            Mark fixed
          </Button>
        </Example>

        <Example title="With an icon: leading, trailing, icon only">
          <Button variant="outline">
            <HugeiconsIcon
              icon={Download01Icon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            Export PDF
          </Button>
          <Button variant="outline">
            Next flag
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              data-icon="inline-end"
            />
          </Button>
          <Button variant="outline" size="icon" aria-label="Upload roster">
            <HugeiconsIcon icon={Upload01Icon} strokeWidth={2} />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Upload roster">
            <HugeiconsIcon icon={Upload01Icon} strokeWidth={2} />
          </Button>
        </Example>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={buttonVariants}
            states={[
              "default",
              "hover",
              "focus",
              "active",
              "disabled",
              "loading",
            ]}
            render={(variant, state) =>
              state === "loading" ? (
                <Button variant={variant} disabled>
                  <Spinner data-icon="inline-start" />
                  Mark fixed
                </Button>
              ) : (
                <Button variant={variant} {...previewState(state)}>
                  Mark fixed
                </Button>
              )
            }
          />
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="While the roster uploads">
            <Button disabled>
              <Spinner data-icon="inline-start" />
              Uploading roster
            </Button>
            <Button variant="ghost">Cancel</Button>
          </Example>
          <Example title="As a link">
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href="#inputs" />}
            >
              Go to inputs
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                strokeWidth={2}
                data-icon="inline-end"
              />
            </Button>
          </Example>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="A long label in a narrow space truncates">
            <div className="flex w-full max-w-64">
              <Button variant="secondary" className="max-w-full">
                <span className="truncate">
                  Send this pay period&apos;s check-in to all 48 employees now
                </span>
              </Button>
            </div>
          </Example>
          <Example title="On ink" dark>
            <Button>Book a demo</Button>
            <Button variant="secondary">Upload roster</Button>
            <Button variant="outline">Export PDF</Button>
          </Example>
        </div>
      </Block>

      <Block
        name="Button group"
        when="Joins actions that belong to one thing, such as an export and its formats, or stepping between pay periods."
      >
        <Example title="An action with more options">
          <ButtonGroup>
            <Button variant="secondary">
              <HugeiconsIcon
                icon={Download01Icon}
                strokeWidth={2}
                data-icon="inline-start"
              />
              Export PDF
            </Button>
            <ButtonGroupSeparator />
            <Button
              variant="secondary"
              size="icon"
              aria-label="More export formats"
            >
              <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
            </Button>
          </ButtonGroup>
        </Example>

        <Example title="Stepping between pay periods, with a text segment">
          <ButtonGroup>
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous pay period"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} />
            </Button>
            <ButtonGroupText>Nov 9 to Nov 22</ButtonGroupText>
            <Button variant="outline" size="icon" aria-label="Next pay period">
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
            </Button>
          </ButtonGroup>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With an input">
            <ButtonGroup className="w-full max-w-sm">
              <Input
                aria-label="Check-in link"
                readOnly
                defaultValue="fairshift.com/c/midtown"
              />
              <Button variant="outline">
                <HugeiconsIcon
                  icon={Copy01Icon}
                  strokeWidth={2}
                  data-icon="inline-start"
                />
                Copy
              </Button>
            </ButtonGroup>
          </Example>
          <Example title="Vertical, small">
            <ButtonGroup orientation="vertical">
              <Button variant="outline" size="sm">
                Mark fixed
              </Button>
              <ButtonGroupSeparator orientation="horizontal" />
              <Button variant="outline" size="sm">
                Add a note
              </Button>
              <ButtonGroupSeparator orientation="horizontal" />
              <Button variant="outline" size="sm" disabled>
                Reopen flag
              </Button>
            </ButtonGroup>
          </Example>
        </div>
      </Block>

      <Block
        name="Toggle"
        when="Turns one view option on or off and keeps showing which it is. For a setting that saves, use a switch."
      >
        <Example title="Filtering the flag list">
          <Toggle variant="outline" defaultPressed>
            <HugeiconsIcon
              icon={Flag02Icon}
              strokeWidth={2}
              data-icon="inline-start"
            />
            Open flags only
          </Toggle>
          <Toggle variant="outline">Show fixed</Toggle>
        </Example>

        <Example title="Sizes: small, default, large. Text, then icon only">
          <Toggle variant="outline" size="sm">
            Urgent
          </Toggle>
          <Toggle variant="outline">Urgent</Toggle>
          <Toggle variant="outline" size="lg">
            Urgent
          </Toggle>
          <Toggle variant="outline" size="sm" aria-label="Open flags only">
            <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
          </Toggle>
          <Toggle variant="outline" aria-label="Open flags only">
            <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
          </Toggle>
          <Toggle variant="outline" size="lg" aria-label="Open flags only">
            <HugeiconsIcon icon={Flag02Icon} strokeWidth={2} />
          </Toggle>
        </Example>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["default", "outline"] as const}
            states={["default", "hover", "focus", "pressed", "disabled"]}
            render={(variant, state) => (
              <Toggle
                variant={variant}
                pressed={state === "pressed"}
                {...previewState(state)}
              >
                Urgent
              </Toggle>
            )}
          />
        </Example>
      </Block>

      <Block
        name="Toggle group"
        when="Picks from two to seven options that are all visible at once. One choice by default, several with multiple."
      >
        <Example title="How often you run payroll">
          <ToggleGroup
            variant="outline"
            defaultValue={["biweekly"]}
            aria-label="Pay schedule"
            className="flex-wrap"
          >
            {paySchedules.map((schedule) => (
              <ToggleGroupItem key={schedule.value} value={schedule.value}>
                {schedule.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Several at once">
            <ToggleGroup
              multiple
              variant="outline"
              defaultValue={["Midtown", "Elk Grove"]}
              aria-label="Locations"
              className="flex-wrap"
            >
              {locations.map((location) => (
                <ToggleGroupItem key={location} value={location}>
                  {location}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Example>
          <Example title="Joined, icon only">
            <ToggleGroup
              variant="outline"
              spacing={0}
              defaultValue={["list"]}
              aria-label="Fix log layout"
            >
              <ToggleGroupItem value="list" aria-label="List">
                <HugeiconsIcon icon={ListViewIcon} strokeWidth={2} />
              </ToggleGroupItem>
              <ToggleGroupItem value="grid" aria-label="Grid">
                <HugeiconsIcon icon={GridViewIcon} strokeWidth={2} />
              </ToggleGroupItem>
            </ToggleGroup>
          </Example>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Small, without outlines">
            <ToggleGroup
              size="sm"
              defaultValue={["open"]}
              aria-label="Flag status"
            >
              <ToggleGroupItem value="open">Open</ToggleGroupItem>
              <ToggleGroupItem value="fixed">Fixed</ToggleGroupItem>
              <ToggleGroupItem value="all">All flags</ToggleGroupItem>
            </ToggleGroup>
          </Example>
          <Example title="Vertical, with one option unavailable">
            <ToggleGroup
              variant="outline"
              orientation="vertical"
              defaultValue={["Midtown"]}
              aria-label="Location"
            >
              <ToggleGroupItem value="Midtown">Midtown</ToggleGroupItem>
              <ToggleGroupItem value="Fair Oaks">Fair Oaks</ToggleGroupItem>
              <ToggleGroupItem value="Elk Grove" disabled>
                Elk Grove
              </ToggleGroupItem>
            </ToggleGroup>
          </Example>
        </div>

        <Example title="With a field title">
          <Field orientation="horizontal" className="max-w-xl flex-wrap">
            <FieldTitle id="actions-status-title">Show flags that are</FieldTitle>
            <ToggleGroup
              variant="outline"
              size="sm"
              defaultValue={["open"]}
              aria-labelledby="actions-status-title"
            >
              <ToggleGroupItem value="open">Open</ToggleGroupItem>
              <ToggleGroupItem value="fixed">Fixed</ToggleGroupItem>
            </ToggleGroup>
          </Field>
        </Example>
      </Block>

      <Block
        name="Badge"
        when="Labels the status of a row: an open flag, a fix, a count. A tag with 4px corners, never a pill and never a button."
      >
        <Example
          title="Flags from the last check-in"
          className="flex-col items-stretch gap-0"
        >
          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span className="type-small">Missed meal break, Midtown</span>
            <Badge variant="destructive">Urgent</Badge>
          </div>
          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span className="type-small">Short on overtime pay, Fair Oaks</span>
            <Badge variant="outline">Open</Badge>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="type-small">Late final paycheck, Elk Grove</span>
            <Badge variant="secondary">Fixed</Badge>
          </div>
        </Example>

        <Example title="Variants">
          <Badge>New reply</Badge>
          <Badge variant="secondary">Fixed</Badge>
          <Badge variant="outline">Open</Badge>
          <Badge variant="destructive">Urgent</Badge>
          <Badge variant="ghost">Draft</Badge>
          <Badge variant="link">3 notes</Badge>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With an icon, and as a count">
            <Badge variant="secondary">
              <HugeiconsIcon
                icon={Tick02Icon}
                strokeWidth={2}
                data-icon="inline-start"
              />
              Fixed Nov 12
            </Badge>
            <Badge variant="outline">
              <HugeiconsIcon
                icon={Flag02Icon}
                strokeWidth={2}
                data-icon="inline-start"
              />
              2 open
            </Badge>
            <Badge variant="outline" className="tabular-nums">
              48
            </Badge>
          </Example>
          <Example title="Long text truncates inside its row">
            <div className="flex w-full max-w-56">
              <Badge variant="outline" className="max-w-full shrink">
                <span className="truncate">
                  Missed second meal break on a shift over ten hours
                </span>
              </Badge>
            </div>
          </Example>
        </div>

        <Example title="As a link, states pinned" className="items-start">
          <StateMatrix
            rows={badgeVariants}
            states={["default", "hover", "focus"]}
            render={(variant, state) => (
              <Badge
                variant={variant}
                render={<a href="#actions" />}
                {...previewState(state)}
              >
                2 open flags
              </Badge>
            )}
          />
        </Example>
      </Block>

      <Block
        name="Kbd"
        when="Shows a keyboard shortcut next to the action it runs. Set in the same sans as everything else."
      >
        <Example title="Shortcuts in the fix log" className="flex-col items-stretch gap-0">
          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span className="type-small">Mark the selected flag fixed</span>
            <Kbd>F</Kbd>
          </div>
          <div className="flex items-center justify-between gap-4 border-b py-3">
            <span className="type-small">Search flags</span>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="type-small">Export this pay period as a PDF</span>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>Shift</Kbd>
              <Kbd>E</Kbd>
            </KbdGroup>
          </div>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Inside a button">
            <Button variant="outline">
              Mark fixed
              <Kbd data-icon="inline-end">F</Kbd>
            </Button>
          </Example>
          <Example title="Inside a search field">
            <InputGroup className="max-w-xs">
              <InputGroupInput
                aria-label="Search flags"
                placeholder="Search flags"
              />
              <InputGroupAddon>
                <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>/</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </Example>
        </div>
      </Block>
    </Section>
  )
}

export function Inputs() {
  const languageAnchor = useComboboxAnchor()
  const [reminderHours, setReminderHours] = React.useState(24)
  const [selectedPayday, setSelectedPayday] = React.useState<Date | undefined>(
    payday
  )
  const [selectedPeriod, setSelectedPeriod] = React.useState<
    DateRange | undefined
  >(payPeriod)

  return (
    <Section
      id="inputs"
      title="Inputs"
      intro="How an owner sets up a check-in and how the team answers it. Every control is 44px tall with 8px corners, and the label always says what to enter."
    >
      <Block
        name="Field"
        when="Wraps every control with its label, help text and error. Forms are a field group of fields, never loose inputs."
      >
        <Example
          title="Setting up payday check-ins"
          className="flex-col items-stretch"
        >
          <form
            className="w-full max-w-lg"
            onSubmit={(event) => event.preventDefault()}
          >
            <FieldSet>
              <FieldLegend>Your business</FieldLegend>
              <FieldDescription>
                We use this to time the check-in text for the day your team
                gets paid.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="field-business">Business name</FieldLabel>
                  <Input
                    id="field-business"
                    name="business"
                    autoComplete="organization"
                    defaultValue="Midtown Bakehouse"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="field-schedule">Pay schedule</FieldLabel>
                  <PayScheduleSelect
                    id="field-schedule"
                    defaultValue="biweekly"
                    className="w-full"
                  />
                  <FieldDescription>
                    How often you run payroll. You can change this later.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="field-employees">
                    Hourly employees
                  </FieldLabel>
                  <Input
                    id="field-employees"
                    name="employees"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    defaultValue={48}
                  />
                </Field>
                <FieldSeparator />
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldLabel htmlFor="field-anonymous">
                      Keep replies anonymous
                    </FieldLabel>
                    <FieldDescription>
                      You see what was flagged and where, not who said it.
                    </FieldDescription>
                  </FieldContent>
                  <Switch id="field-anonymous" defaultChecked />
                </Field>
                <Field orientation="horizontal">
                  <Button type="submit">Save and continue</Button>
                  <Button type="button" variant="ghost">
                    Back
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Required, with help text" className="items-start">
            <Field>
              <FieldLabel htmlFor="field-email">
                Work email
                <span aria-hidden="true" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <Input
                id="field-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@yourbusiness.com"
              />
              <FieldDescription>
                We send the fix log here after each payday.
              </FieldDescription>
            </Field>
          </Example>
          <Example title="With an error" className="items-start">
            <Field data-invalid>
              <FieldLabel htmlFor="field-phone-error">
                Owner&apos;s mobile number
              </FieldLabel>
              <Input
                id="field-phone-error"
                type="tel"
                aria-invalid
                aria-describedby="field-phone-error-message"
                defaultValue="(916) 555-01"
              />
              <FieldError id="field-phone-error-message">
                That number is too short. Enter all ten digits.
              </FieldError>
            </Field>
          </Example>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Unavailable until a roster is uploaded" className="items-start">
            <Field data-disabled>
              <FieldLabel htmlFor="field-disabled">First check-in</FieldLabel>
              <Input
                id="field-disabled"
                disabled
                defaultValue="Friday, November 27"
              />
              <FieldDescription>
                Upload a roster to schedule the first text.
              </FieldDescription>
            </Field>
          </Example>
          <Example title="A group of checkboxes" className="items-start">
            <FieldSet>
              <FieldLegend variant="label">Send check-ins to</FieldLegend>
              <FieldDescription>
                Pick every location on this pay schedule.
              </FieldDescription>
              <FieldGroup data-slot="checkbox-group">
                {locationItems.map((location) => (
                  <Field key={location.value} orientation="horizontal">
                    <Checkbox
                      id={`field-location-${location.value}`}
                      defaultChecked={location.value !== "elk-grove"}
                    />
                    <FieldLabel htmlFor={`field-location-${location.value}`}>
                      {location.label}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
            </FieldSet>
          </Example>
        </div>

        <Example
          title="Choice cards: the whole card is the label"
          className="items-start"
        >
          <RadioGroup
            defaultValue="payday"
            aria-label="When to send the check-in"
            className="max-w-lg"
          >
            <FieldLabel htmlFor="field-when-payday">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>On payday</FieldTitle>
                  <FieldDescription>
                    The text goes out at 10am the day pay lands.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="payday" id="field-when-payday" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="field-when-after">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>The day after payday</FieldTitle>
                  <FieldDescription>
                    Gives people a day to read their pay stub first.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="after" id="field-when-after" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </Example>
      </Block>

      <Block
        name="Input"
        when="One line of text: a name, a number, an email. Use a field around it so it always has a label."
      >
        <Example title="A text input in a field" className="items-start">
          <Field className="max-w-sm">
            <FieldLabel htmlFor="input-name">Location name</FieldLabel>
            <Input id="input-name" defaultValue="Fair Oaks" />
          </Field>
        </Example>

        <Example title="Types: email, phone, number, file" className="items-start">
          <FieldGroup className="max-w-sm">
            <Field>
              <FieldLabel htmlFor="input-email">Email</FieldLabel>
              <Input
                id="input-email"
                type="email"
                autoComplete="email"
                placeholder="you@yourbusiness.com"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-tel">Mobile number</FieldLabel>
              <Input
                id="input-tel"
                type="tel"
                autoComplete="tel"
                placeholder="(916) 555-0142"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-count">Hourly employees</FieldLabel>
              <Input
                id="input-count"
                type="number"
                inputMode="numeric"
                min={1}
                defaultValue={48}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-roster">Roster file</FieldLabel>
              <Input id="input-roster" type="file" accept=".csv,.xlsx" />
              <FieldDescription>
                A CSV or Excel file with a name and mobile number on each row.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </Example>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["empty", "filled"] as const}
            states={["default", "focus", "disabled", "invalid"]}
            render={(row, state) => (
              <Input
                aria-label="Location name"
                className="min-w-36"
                placeholder="Location name"
                defaultValue={row === "filled" ? "Elk Grove" : undefined}
                aria-invalid={state === "invalid" || undefined}
                {...previewState(state)}
              />
            )}
          />
        </Example>

        <Example title="A long value scrolls inside the input" className="items-start">
          <Field className="max-w-xs">
            <FieldLabel htmlFor="input-long">Business name</FieldLabel>
            <Input
              id="input-long"
              defaultValue="Sacramento Valley Family Restaurant Group, Fair Oaks Boulevard"
            />
          </Field>
        </Example>
      </Block>

      <Block
        name="Input group"
        when="An input with something attached: an icon, a prefix, a unit, or a button that acts on what was typed."
      >
        <Example title="Searching the fix log" className="items-start">
          <InputGroup className="max-w-sm">
            <InputGroupInput
              aria-label="Search the fix log"
              placeholder="Search the fix log"
            />
            <InputGroupAddon>
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With a prefix" className="items-start">
            <Field>
              <FieldLabel htmlFor="group-phone">Mobile number</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>+1</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="group-phone"
                  type="tel"
                  autoComplete="tel-national"
                  placeholder="(916) 555-0142"
                />
              </InputGroup>
            </Field>
          </Example>
          <Example title="With a unit" className="items-start">
            <Field>
              <FieldLabel htmlFor="group-count">Team size</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="group-count"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  defaultValue={48}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>employees</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </Example>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With a button" className="items-start">
            <Field>
              <FieldLabel htmlFor="group-link">Check-in link</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="group-link"
                  readOnly
                  defaultValue="fairshift.com/c/midtown"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Copy link" size="icon-xs">
                    <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </Example>
          <Example title="With an error" className="items-start">
            <Field data-invalid>
              <FieldLabel htmlFor="group-phone-error">Mobile number</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>+1</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="group-phone-error"
                  type="tel"
                  aria-invalid
                  defaultValue="(916) 555-01"
                />
              </InputGroup>
              <FieldError>Enter all ten digits.</FieldError>
            </Field>
          </Example>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="A note with its actions underneath" className="items-start">
            <Field>
              <FieldLabel htmlFor="group-note">Add to the fix log</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="group-note"
                  placeholder="What did you change, and when?"
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>Visible to owners only</InputGroupText>
                  <InputGroupButton
                    variant="secondary"
                    size="sm"
                    className="ml-auto"
                  >
                    <HugeiconsIcon
                      icon={SentIcon}
                      strokeWidth={2}
                      data-icon="inline-start"
                    />
                    Add note
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </Example>
          <Example title="Unavailable" className="items-start">
            <Field data-disabled>
              <FieldLabel htmlFor="group-disabled">Search flags</FieldLabel>
              <InputGroup data-disabled>
                <InputGroupInput
                  id="group-disabled"
                  disabled
                  placeholder="No flags yet"
                />
                <InputGroupAddon>
                  <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </Example>
        </div>
      </Block>

      <Block
        name="Textarea"
        when="More than one line: the question you send, or a note in the fix log. It grows with what is typed."
      >
        <Example title="The question your team gets" className="items-start">
          <Field className="max-w-lg">
            <FieldLabel htmlFor="textarea-question">Check-in question</FieldLabel>
            <Textarea
              id="textarea-question"
              defaultValue={breakQuestion}
            />
            <FieldDescription>
              Keep it to one question with a yes or no answer.
            </FieldDescription>
          </Field>
        </Example>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["empty", "filled"] as const}
            states={["default", "focus", "disabled", "invalid"]}
            render={(row, state) => (
              <Textarea
                aria-label="Fix log note"
                className="min-w-40"
                placeholder="What did you change?"
                defaultValue={
                  row === "filled"
                    ? "Paid the missed meal premium on the Nov 27 check."
                    : undefined
                }
                aria-invalid={state === "invalid" || undefined}
                {...previewState(state)}
              />
            )}
          />
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With an error" className="items-start">
            <Field data-invalid>
              <FieldLabel htmlFor="textarea-error">Check-in question</FieldLabel>
              <Textarea
                id="textarea-error"
                aria-invalid
                defaultValue="Breaks ok"
              />
              <FieldError>
                Write this as a full question so it reads clearly in a text.
              </FieldError>
            </Field>
          </Example>
          <Example title="A long note grows the field" className="items-start">
            <Field>
              <FieldLabel htmlFor="textarea-long">Fix log note</FieldLabel>
              <Textarea
                id="textarea-long"
                defaultValue="Two people at Midtown said they worked through their meal break on the Saturday double. We checked the schedule, confirmed there was no cover between 2pm and 4pm, and paid one hour of premium pay to both on the Nov 27 check. From next week a third person is on the Saturday close."
              />
            </Field>
          </Example>
        </div>
      </Block>

      <Block
        name="Select"
        when="One choice from a short, known list, such as a pay schedule. If the list is long enough to search, use a combobox."
      >
        <Example title="Choosing a pay schedule" className="items-start">
          <Field className="max-w-sm">
            <FieldLabel htmlFor="select-schedule">Pay schedule</FieldLabel>
            <PayScheduleSelect id="select-schedule" className="w-full" />
            <FieldDescription>
              Most hourly teams in California are paid every two weeks.
            </FieldDescription>
          </Field>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With a group label and a separator">
            <Select items={locationFilterItems} defaultValue="all">
              <SelectTrigger aria-label="Location" className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All locations</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Sacramento area</SelectLabel>
                  {locationItems.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Example>
          <Example title="Sizes: small, default">
            <PayScheduleSelect
              size="sm"
              defaultValue="weekly"
              aria-label="Pay schedule"
            />
            <PayScheduleSelect
              defaultValue="weekly"
              aria-label="Pay schedule"
            />
          </Example>
        </div>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["placeholder", "chosen"] as const}
            states={["default", "focus", "disabled", "invalid"]}
            render={(row, state) => (
              <PayScheduleSelect
                aria-label="Pay schedule"
                defaultValue={row === "chosen" ? "semimonthly" : undefined}
                aria-invalid={state === "invalid" || undefined}
                {...previewState(state)}
              />
            )}
          />
        </Example>

        <Example title="With an error" className="items-start">
          <Field data-invalid className="max-w-sm">
            <FieldLabel htmlFor="select-error">Pay schedule</FieldLabel>
            <PayScheduleSelect
              id="select-error"
              className="w-full"
              aria-invalid
            />
            <FieldError>Choose how often you run payroll.</FieldError>
          </Field>
        </Example>
      </Block>

      <Block
        name="Native select"
        when="The browser's own select. Use it where the phone's built-in picker is the better experience, or where the page must work before scripts load."
      >
        <Example title="Choosing a location" className="items-start">
          <Field className="max-w-sm">
            <FieldLabel htmlFor="native-location">Location</FieldLabel>
            <NativeSelect
              id="native-location"
              defaultValue="midtown"
              className="w-full"
            >
              {locationItems.map((location) => (
                <NativeSelectOption key={location.value} value={location.value}>
                  {location.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With option groups">
            <NativeSelect aria-label="Check-in language" defaultValue="es">
              <NativeSelectOptGroup label="Most used">
                <NativeSelectOption value="en">English</NativeSelectOption>
                <NativeSelectOption value="es">Español</NativeSelectOption>
              </NativeSelectOptGroup>
              <NativeSelectOptGroup label="Also available">
                <NativeSelectOption value="zh">中文</NativeSelectOption>
                <NativeSelectOption value="tl">Tagalog</NativeSelectOption>
                <NativeSelectOption value="vi">Tiếng Việt</NativeSelectOption>
                <NativeSelectOption value="ko">한국어</NativeSelectOption>
              </NativeSelectOptGroup>
            </NativeSelect>
          </Example>
          <Example title="Sizes: small, default">
            <NativeSelect
              size="sm"
              aria-label="Pay schedule"
              defaultValue="weekly"
            >
              {paySchedules.map((schedule) => (
                <NativeSelectOption key={schedule.value} value={schedule.value}>
                  {schedule.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <NativeSelect aria-label="Pay schedule" defaultValue="weekly">
              {paySchedules.map((schedule) => (
                <NativeSelectOption key={schedule.value} value={schedule.value}>
                  {schedule.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Example>
        </div>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["default", "sm"] as const}
            states={["default", "focus", "disabled", "invalid"]}
            render={(size, state) => (
              <NativeSelect
                size={size}
                aria-label="Location"
                defaultValue="fair-oaks"
                aria-invalid={state === "invalid" || undefined}
                {...previewState(state)}
              >
                {locationItems.map((location) => (
                  <NativeSelectOption
                    key={location.value}
                    value={location.value}
                  >
                    {location.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            )}
          />
        </Example>
      </Block>

      <Block
        name="Combobox"
        when="A select you can type into. Use it when the list is long, or when people know the name they are looking for."
      >
        <Example title="Finding a language by typing" className="items-start">
          <Field className="max-w-sm">
            <FieldLabel htmlFor="combobox-language">
              Check-in language
            </FieldLabel>
            <Combobox items={languages} defaultValue="Español">
              <ComboboxInput
                id="combobox-language"
                placeholder="Search languages"
                showClear
              />
              <ComboboxContent>
                <ComboboxEmpty>We do not text in that language yet.</ComboboxEmpty>
                <ComboboxList>
                  {(language: string) => (
                    <ComboboxItem key={language} value={language}>
                      {language}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldDescription>
              Type a language we do not offer to see the empty message.
            </FieldDescription>
          </Field>
        </Example>

        <Example title="Several choices, shown as chips" className="items-start">
          <Field className="max-w-lg">
            <FieldLabel htmlFor="combobox-languages">
              Languages your team reads
            </FieldLabel>
            <Combobox
              multiple
              items={languages}
              defaultValue={["English", "Español", "Tiếng Việt"]}
            >
              <ComboboxChips ref={languageAnchor}>
                <ComboboxValue>
                  {(values: string[]) => (
                    <>
                      {values.map((value) => (
                        <ComboboxChip key={value}>{value}</ComboboxChip>
                      ))}
                      <ComboboxChipsInput
                        id="combobox-languages"
                        placeholder="Add a language"
                      />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>
              <ComboboxContent anchor={languageAnchor}>
                <ComboboxEmpty>We do not text in that language yet.</ComboboxEmpty>
                <ComboboxList>
                  {(language: string) => (
                    <ComboboxItem key={language} value={language}>
                      {language}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With an error" className="items-start">
            <Field data-invalid>
              <FieldLabel htmlFor="combobox-error">Location</FieldLabel>
              <Combobox items={locations}>
                <ComboboxInput
                  id="combobox-error"
                  placeholder="Search locations"
                  aria-invalid
                />
                <ComboboxContent>
                  <ComboboxEmpty>No location with that name.</ComboboxEmpty>
                  <ComboboxList>
                    {(location: string) => (
                      <ComboboxItem key={location} value={location}>
                        {location}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FieldError>Choose the location this roster belongs to.</FieldError>
            </Field>
          </Example>
          <Example title="Unavailable" className="items-start">
            <Field data-disabled>
              <FieldLabel htmlFor="combobox-disabled">Location</FieldLabel>
              <Combobox items={locations} defaultValue="Midtown" disabled>
                <ComboboxInput id="combobox-disabled" disabled />
                <ComboboxContent>
                  <ComboboxList>
                    {(location: string) => (
                      <ComboboxItem key={location} value={location}>
                        {location}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <FieldDescription>
                You only have one location on this plan.
              </FieldDescription>
            </Field>
          </Example>
        </div>
      </Block>

      <Block
        name="Checkbox"
        when="Any number of choices from a list, or one thing to agree to. It takes effect when the form is saved."
      >
        <Example title="Which questions to ask each payday" className="items-start">
          <FieldSet>
            <FieldLegend variant="label">Ask about</FieldLegend>
            <FieldGroup data-slot="checkbox-group">
              <Field orientation="horizontal">
                <Checkbox id="checkbox-breaks" defaultChecked />
                <FieldContent>
                  <FieldLabel htmlFor="checkbox-breaks">
                    Meal and rest breaks
                  </FieldLabel>
                  <FieldDescription>{breakQuestion}</FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="checkbox-hours" defaultChecked />
                <FieldContent>
                  <FieldLabel htmlFor="checkbox-hours">Hours and pay</FieldLabel>
                  <FieldDescription>
                    Does your paycheck match the hours you worked?
                  </FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="checkbox-tips" />
                <FieldContent>
                  <FieldLabel htmlFor="checkbox-tips">Tips</FieldLabel>
                  <FieldDescription>
                    Did you get all the tips you were owed?
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>
        </Example>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["unchecked", "checked", "mixed"] as const}
            states={["default", "focus", "disabled", "invalid"]}
            render={(row, state) => (
              <Checkbox
                aria-label="Meal and rest breaks"
                defaultChecked={row === "checked"}
                indeterminate={row === "mixed"}
                aria-invalid={state === "invalid" || undefined}
                {...previewState(state)}
              />
            )}
          />
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With an error" className="items-start">
            <Field data-invalid>
              <Field orientation="horizontal" data-invalid>
                <Checkbox id="checkbox-consent" aria-invalid />
                <FieldLabel htmlFor="checkbox-consent">
                  Everyone on this roster has agreed to get texts from us
                </FieldLabel>
              </Field>
              <FieldError>Confirm this before we send the first text.</FieldError>
            </Field>
          </Example>
          <Example title="Unavailable, with a long label that wraps" className="items-start">
            <Field orientation="horizontal" data-disabled className="max-w-xs">
              <Checkbox id="checkbox-disabled" disabled defaultChecked />
              <FieldLabel htmlFor="checkbox-disabled">
                Send a copy of every fix log to the owner of each location
                when the pay period closes
              </FieldLabel>
            </Field>
          </Example>
        </div>
      </Block>

      <Block
        name="Radio group"
        when="Exactly one choice from a few options that are worth reading side by side. This is also how an employee answers."
      >
        <Example title="The check-in, as a form" className="items-start">
          <FieldSet className="max-w-lg">
            <FieldLegend variant="label">{breakQuestion}</FieldLegend>
            <RadioGroup defaultValue="yes" name="breaks">
              <Field orientation="horizontal">
                <RadioGroupItem value="yes" id="radio-yes" />
                <FieldLabel htmlFor="radio-yes">Yes, all of them</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="no" id="radio-no" />
                <FieldLabel htmlFor="radio-no">No, I missed some</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="unsure" id="radio-unsure" />
                <FieldLabel htmlFor="radio-unsure">I am not sure</FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>
        </Example>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["unselected", "selected"] as const}
            states={["default", "focus", "disabled", "invalid"]}
            render={(row, state) => (
              <RadioGroup
                aria-label="Pay schedule"
                defaultValue={row === "selected" ? "weekly" : undefined}
                className="w-fit"
              >
                <RadioGroupItem
                  value="weekly"
                  aria-label="Weekly"
                  aria-invalid={state === "invalid" || undefined}
                  {...previewState(state)}
                />
              </RadioGroup>
            )}
          />
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With descriptions" className="items-start">
            <RadioGroup defaultValue="biweekly" aria-label="Pay schedule">
              <Field orientation="horizontal">
                <RadioGroupItem value="weekly" id="radio-weekly" />
                <FieldContent>
                  <FieldLabel htmlFor="radio-weekly">Weekly</FieldLabel>
                  <FieldDescription>52 check-ins a year.</FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="biweekly" id="radio-biweekly" />
                <FieldContent>
                  <FieldLabel htmlFor="radio-biweekly">
                    Every two weeks
                  </FieldLabel>
                  <FieldDescription>26 check-ins a year.</FieldDescription>
                </FieldContent>
              </Field>
            </RadioGroup>
          </Example>
          <Example title="With an error" className="items-start">
            <FieldSet data-invalid>
              <FieldLegend variant="label">Pay schedule</FieldLegend>
              <RadioGroup aria-label="Pay schedule">
                <Field orientation="horizontal" data-invalid>
                  <RadioGroupItem
                    value="semimonthly"
                    id="radio-error-semimonthly"
                    aria-invalid
                  />
                  <FieldLabel htmlFor="radio-error-semimonthly">
                    Twice a month
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal" data-invalid>
                  <RadioGroupItem
                    value="monthly"
                    id="radio-error-monthly"
                    aria-invalid
                  />
                  <FieldLabel htmlFor="radio-error-monthly">Monthly</FieldLabel>
                </Field>
              </RadioGroup>
              <FieldError>Choose one so we know when payday is.</FieldError>
            </FieldSet>
          </Example>
        </div>
      </Block>

      <Block
        name="Switch"
        when="A setting that is on or off and takes effect straight away. If it waits for a save button, use a checkbox."
      >
        <Example title="Check-in settings" className="items-start">
          <FieldGroup className="max-w-lg">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="switch-reminder">
                  Send a reminder
                </FieldLabel>
                <FieldDescription>
                  One more text the next morning to anyone who has not replied.
                </FieldDescription>
              </FieldContent>
              <Switch id="switch-reminder" defaultChecked />
            </Field>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="switch-urgent">
                  Text me about urgent flags
                </FieldLabel>
                <FieldDescription>
                  We text the owner as soon as someone reports unpaid wages.
                </FieldDescription>
              </FieldContent>
              <Switch id="switch-urgent" />
            </Field>
          </FieldGroup>
        </Example>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["off", "on", "on, small"] as const}
            states={["default", "focus", "disabled", "invalid"]}
            render={(row, state) => (
              <Switch
                aria-label="Send a reminder"
                size={row === "on, small" ? "sm" : "default"}
                defaultChecked={row !== "off"}
                aria-invalid={state === "invalid" || undefined}
                {...previewState(state)}
              />
            )}
          />
        </Example>

        <Example title="Unavailable on this plan" className="items-start">
          <Field orientation="horizontal" data-disabled className="max-w-lg">
            <FieldContent>
              <FieldLabel htmlFor="switch-disabled">
                Check in at every location separately
              </FieldLabel>
              <FieldDescription>
                Add a second location to turn this on.
              </FieldDescription>
            </FieldContent>
            <Switch id="switch-disabled" disabled />
          </Field>
        </Example>
      </Block>

      <Block
        name="Slider"
        when="A number where the rough position matters more than the exact figure. Always show the value next to it."
      >
        <Example title="How long to wait before the reminder" className="items-start">
          <Field className="max-w-lg">
            <div className="flex items-baseline justify-between gap-4">
              <FieldTitle id="slider-reminder-title">
                Send the reminder after
              </FieldTitle>
              <span className="type-small text-muted-foreground tabular-nums">
                {reminderHours} hours
              </span>
            </div>
            <Slider
              aria-labelledby="slider-reminder-title"
              min={4}
              max={72}
              step={4}
              value={[reminderHours]}
              onValueChange={(value) =>
                setReminderHours(Array.isArray(value) ? value[0] : value)
              }
            />
            <FieldDescription>
              Most replies come in the first four hours.
            </FieldDescription>
          </Field>
        </Example>

        <Example title="A range: the hours we are allowed to text" className="items-start">
          <Field className="max-w-lg">
            <div className="flex items-baseline justify-between gap-4">
              <FieldTitle id="slider-hours-title">Texting hours</FieldTitle>
              <span className="type-small text-muted-foreground">
                9am to 6pm
              </span>
            </div>
            <Slider
              aria-labelledby="slider-hours-title"
              min={6}
              max={22}
              step={1}
              defaultValue={[9, 18]}
            />
          </Field>
        </Example>

        <Example title="States, pinned" className="items-start">
          <StateMatrix
            rows={["single", "range"] as const}
            states={["default", "disabled"]}
            render={(row, state) => (
              <Slider
                aria-label="Reminder delay"
                className="min-w-40"
                defaultValue={row === "range" ? [25, 70] : [40]}
                {...previewState(state)}
              />
            )}
          />
        </Example>
      </Block>

      <Block
        name="Input OTP"
        when="A short code we texted to someone. One box per digit, so it is obvious how many are left."
      >
        <Example title="Confirming the owner's mobile number" className="items-start">
          <Field>
            <FieldLabel htmlFor="otp-code">
              Enter the six-digit code we texted you
            </FieldLabel>
            <InputOTP id="otp-code" maxLength={6} defaultValue="482">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <FieldDescription>
              Sent to the number ending in 0142. It expires in ten minutes.
            </FieldDescription>
          </Field>
        </Example>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="With an error" className="items-start">
            <Field data-invalid>
              <FieldLabel htmlFor="otp-error">Six-digit code</FieldLabel>
              <InputOTP
                id="otp-error"
                maxLength={6}
                defaultValue="482913"
                aria-invalid
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} aria-invalid />
                  <InputOTPSlot index={1} aria-invalid />
                  <InputOTPSlot index={2} aria-invalid />
                  <InputOTPSlot index={3} aria-invalid />
                  <InputOTPSlot index={4} aria-invalid />
                  <InputOTPSlot index={5} aria-invalid />
                </InputOTPGroup>
              </InputOTP>
              <FieldError>
                That code does not match. Check the text and try again.
              </FieldError>
            </Field>
          </Example>
          <Example title="Unavailable while we check the code" className="items-start">
            <Field data-disabled>
              <FieldLabel htmlFor="otp-disabled">Six-digit code</FieldLabel>
              <InputOTP
                id="otp-disabled"
                maxLength={6}
                defaultValue="482913"
                disabled
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>
          </Example>
        </div>
      </Block>

      <Block
        name="Calendar"
        when="Picks a day or a run of days when seeing the week matters: the next payday, or the pay period a fix log covers."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Choosing the next payday. Weekends are unavailable" className="items-start">
            <Calendar
              mode="single"
              selected={selectedPayday}
              onSelect={setSelectedPayday}
              defaultMonth={payday}
              disabled={{ dayOfWeek: [0, 6] }}
              className="rounded-lg"
            />
          </Example>
          <Example title="Choosing a pay period" className="items-start">
            <Calendar
              mode="range"
              selected={selectedPeriod}
              onSelect={setSelectedPeriod}
              defaultMonth={payday}
              className="rounded-lg"
            />
          </Example>
        </div>

        <Example title="With month and year menus, for dates further away" className="items-start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            defaultMonth={payday}
            selected={selectedPayday}
            onSelect={setSelectedPayday}
            className="rounded-lg"
          />
        </Example>
      </Block>

      <Block
        name="Label"
        when="The name of a control. Inside a form, use the field label; this is the bare label for a control that stands alone."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Beside a checkbox">
            <div className="flex items-center gap-2">
              <Checkbox id="label-export" defaultChecked />
              <Label htmlFor="label-export">Include fixed flags in the PDF</Label>
            </div>
          </Example>
          <Example title="Beside a switch">
            <div className="flex items-center gap-2">
              <Switch id="label-switch" />
              <Label htmlFor="label-switch">Show Spanish replies in English</Label>
            </div>
          </Example>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Example title="Above an input" className="items-start">
            <div className="flex w-full max-w-sm flex-col gap-3">
              <Label htmlFor="label-input">Roster nickname</Label>
              <Input id="label-input" defaultValue="Midtown, front of house" />
            </div>
          </Example>
          <Example title="Dimmed with its control">
            <div className="group flex items-center gap-2" data-disabled="true">
              <Checkbox id="label-disabled" disabled />
              <Label htmlFor="label-disabled">Include employee names</Label>
            </div>
          </Example>
        </div>
      </Block>

      <Block
        name="Right to left"
        when="The same components inside a direction provider. Labels, icons and menus mirror; nothing is rebuilt."
      >
        <Example title="The check-in in Arabic" className="items-start">
          <DirectionProvider direction="rtl">
            <div dir="rtl" lang="ar" className="w-full max-w-lg">
              <FieldGroup>
                <FieldSet>
                  <FieldLegend variant="label">
                    هل حصلت على جميع استراحات الوجبات والراحة في فترة الدفع
                    هذه؟
                  </FieldLegend>
                  <RadioGroup defaultValue="yes" name="breaks-rtl">
                    <Field orientation="horizontal">
                      <RadioGroupItem value="yes" id="rtl-yes" />
                      <FieldLabel htmlFor="rtl-yes">نعم</FieldLabel>
                    </Field>
                    <Field orientation="horizontal">
                      <RadioGroupItem value="no" id="rtl-no" />
                      <FieldLabel htmlFor="rtl-no">لا</FieldLabel>
                    </Field>
                  </RadioGroup>
                </FieldSet>
                <Field>
                  <FieldLabel htmlFor="rtl-location">الموقع</FieldLabel>
                  <Select items={locationItems} defaultValue="midtown">
                    <SelectTrigger id="rtl-location" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {locationItems.map((location) => (
                          <SelectItem
                            key={location.value}
                            value={location.value}
                          >
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="rtl-search">بحث</FieldLabel>
                  <InputGroup>
                    <InputGroupInput id="rtl-search" placeholder="بحث" />
                    <InputGroupAddon>
                      <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field orientation="horizontal">
                  <FieldLabel htmlFor="rtl-reminder">إرسال تذكير</FieldLabel>
                  <Switch id="rtl-reminder" defaultChecked />
                </Field>
                <Slider
                  aria-label="مهلة التذكير"
                  defaultValue={[40]}
                />
                <Field orientation="horizontal">
                  <Button>
                    إرسال
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      strokeWidth={2}
                      data-icon="inline-end"
                    />
                  </Button>
                  <Button variant="ghost">تخطي</Button>
                </Field>
              </FieldGroup>
            </div>
          </DirectionProvider>
        </Example>
      </Block>
    </Section>
  )
}

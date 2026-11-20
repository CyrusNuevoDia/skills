# Numbers, Dates, and Units

## Numbers

### Ordinal numbers
- Spell out all ordinal numbers in text.
  ✅ Recommended: first, fifth, twelfth, forty-third
  ❌ Not recommended: 1st, 5th, 12th, 43rd

### Numbers as words
Spell out:
- Numbers zero through nine (with the exceptions listed under numerals). ✅ two-day total, four options, five minutes, nine developers
- A number that starts a sentence. ✅ "Fifteen directories are created." Prefer rearranging the sentence so the number appears later. Exception: it's okay, but non-optimal, to begin a sentence with a four-digit year.
  ✅ "In general, avoid sending files larger than 164 MB as attachments." ❌ "164 MB is generally considered too large..."
- A number that is followed by a numeral. ✅ "creates fifteen 100,000-byte files" (but "creates 15 of the 100,000-byte files")
- Indefinite and casual numbers (*millions*, *billions*) for approximate amounts; use numerals for precise numbers. ✅ "thousands of combinations", "a list of a million songs"

Use a nonbreaking space between a number and its noun when they must stay on the same line.

### Numbers as numerals
Use numerals for:
- Numbers 10 and greater. ✅ 24 hours, 728 shipments, 18,000,000 users
- Version numbers, even below 10. ✅ version 3
- Technical quantities (memory, disk space, queries, usage limits). ✅ 6 queries per second, 50 Mbps, 128 bits
- Page, chapter, section, and step numbers (avoid referring to step numbers when possible).
- Prices.
- Numbers without units, such as in mathematical expressions.
- Numbers less than 10 in the same sentence as numbers greater than 9. ✅ "The menu contains 15 options but 6 of them are deselected."
- Negative numbers, most fractions, percentages, dimensions, measurements, and ranges. ✅ 8 pixels
- Numbers containing decimal points. Treat decimals as plural even when ≤ 1.0 (✅ 1.0 inches). Put a zero before the decimal point for values under one (✅ 0.3 inches).

### Roman numerals
- Avoid Roman numerals; use Arabic numerals, which are easier to scan. Roman numerals are acceptable for sub-steps in numbered procedures.

### Fractions
- Express fractions as decimals when possible. ✅ 0.75
- If writing fractions as words, hyphenate numerator and denominator unless one is already hyphenated. ✅ one and one-half, two-fifths, five sixty-fourths

### Percentages
- Use numerals with the percent sign, no space. ✅ 40%
- If a percentage starts a sentence, spell out both the number and *percent*. ✅ "Forty percent of the files..."

### Ranges of numbers
- Use a hyphen with no spaces; don't use an en dash. ✅ 2012-2016
- With units, see the ranges rule under Units of measurement (repeat the unit, use *to*).

### Suspended hyphens
- Use suspended hyphens when hyphenated number compounds modify the same word. ✅ "one-, two-, or three-hour intervals"

### Currency
- Make the country's currency clear; if ambiguous, add a currency indicator before the amount. ✅ US$10
- For US dollars: comma for thousands, period for the decimal, dollar sign first, no punctuation or spaces right of the decimal.
  ✅ $0.006653 per vCPU hour ❌ $0.006,653
  ✅ $10,000 in fees ❌ $10 000 in fees

### Commas and decimal points
- Use standard American formatting: commas grouping three digits in numbers of four or more digits; a period as the decimal point; no digit-group separators to the right of the decimal point.
  ✅ 1,532,784 bytes ❌ 1532784 bytes
  ✅ up to 2,000 vertices ❌ up to 2000 vertices
  ✅ $0.031611/vCPU hour ❌ $0.031 611/vCPU hour

### Dimensions
- Use numerals with a lowercase *x* and no spaces. ✅ 192x192 ❌ 192 x 192

### Context
- Accompany numerical concepts with real-world practical implications (for example, link to a pricing calculator when a feature incurs fees).

## Dates and times

### Times
- Use the 12-hour clock, unless the UI, a command, or a code sample uses 24-hour time — then use that format throughout the page.
- Use exact times when possible; *noon* and *midnight* are okay.
- Use hyphens in time ranges, no surrounding spaces. ✅ 5-10 minutes ago
- Capitalize AM and PM with one space before them. ✅ 3:45 PM
- Drop the minutes from round hours. ✅ 3 PM

### Time zones
- Avoid time zones unless necessary. If needed:
  - Tell the reader if the time is local ("10 AM your local time").
  - Use the timestamp format from the UI if available.
  - Spell out the region and add the UTC offset in parentheses. ✅ US and Canadian Pacific Standard Time (UTC-8)
  - Don't abbreviate the time zone name.
  - If the time doesn't change for daylight saving, use the specific time zone without a UTC reference.

### Dates
- Spell out months and days of the week in full; use the four-digit year. ✅ January 19, 2017
- Day of the week goes before the month. ✅ Tuesday, April 27, 2021
- Month and year only: no comma. ✅ "hired in January 2017"
- Don't abbreviate day or month names except to conserve space (headings, tables): use three-letter abbreviations, capitalized, no trailing period. Abbreviate the whole date or none of it, and be consistent across the document. ✅ Mon, Sep 3, 2018 ❌ Mon, September 3, 2018
- Full date mid-sentence: comma after the year. ✅ "The January 19, 2017, release..." Month-and-year only: no comma. ✅ "The January 2017 release..."
- Don't express months as numbers — numeric dates like 04/05/09 are read differently by region. ✅ February 12, 2017 ❌ 02.12.2017, 12/02/2017
- If a numeric-only date is unavoidable, use ISO 8601: YYYY-MM-DD. ✅ 2017-04-15 ❌ 04/06/2017. In fictional examples, choose a day greater than 12 to differentiate it from the month.
- Date and time together: date first. ✅ 2017-04-15 at 3 PM; May 4, 2009, at 6 PM

### Divisions of the year
- Don't refer to seasons (they invert between hemispheres); use the month, quarter, or temperature.
  ✅ "In November and December, traffic is higher." ❌ "In winter, traffic is higher."
  ✅ "Changes are released in October each year." ❌ "in the Fall of each year"

## Units of measurement

- Put a nonbreaking space (`&nbsp;`) between the number and the unit. ✅ `64&nbsp;GB`, `25&nbsp;mm`, a 128-bit system ❌ 64GB, `64 GB` (breaking space)
- No space before money, percent, or degrees of an angle. ✅ $10, £25, 65%, 180°
- Temperature: nonbreaking space between number and degree symbol, no space between symbol and scale. ✅ `50&nbsp;&deg;C` (50 °C). Kelvin: no degree symbol, nonbreaking space before K. ✅ `300&nbsp;K`
- Don't hyphenate a number+unit compound modifying a noun unless needed for clarity. ✅ 200 GB disk
- In ranges, repeat the unit (symbols and abbreviations, not nouns) for each number and use *to* instead of a hyphen — a hyphen can read as a minus sign. ✅ -40 °C to 85 °C ❌ -40-85 °C
- Hyphenate multiplied units. ✅ 5 vCPU-hours, 40 person-hours
- Lowercase *k* for thousands: no space before *k*, and add a noun so *k* isn't read as kilobytes. ✅ "55k download operations per day"
- Rates: use *per*, not the slash, when space permits; the slash is okay in tight spaces like small table cells. Shorten *per* to *p* only in established abbreviations. ✅ requests per day, Gbps ❌ requests/day, Gb/s
- Match the byte system of the technology you're documenting: decimal kB/MB/GB (powers of 1000) vs binary KiB/MiB/GiB (powers of 1024). Don't write MB when you mean MiB.

## Phone numbers

- Use example numbers from the reserved US range 800-555-0100 through 800-555-0199. Never use a real phone number in examples.
- Use nonbreaking hyphens (`&#8209;`) so the number stays on one line. ✅ `415&#8209;555&#8209;0132`
- North American (NANP) numbers: nonbreaking hyphens between area code, exchange code, and number. ✅ 415-555-0132
- International numbers: include country and area codes, with a plus sign immediately before the country code (no space). ✅ +1-415-555-0132
- Extensions: follow the number with the word *extension* and the extension number. ✅ 415-555-0132, extension 987

## Mathematical notation

### Symbols
- Use HTML entities for mathematical symbols instead of keyboard characters; keyboard symbols are fine for `+`, `=`, and `/`.
- Common entities: − `&minus;`, × `&times;`, ≠ `&ne;`, ± `&plusmn;`, ∓ `&mnplus;`, < `&lt;`, > `&gt;`, ≈ `&asymp;`, ≉ `&nap;`, ≅ `&cong;`, ≤ `&le;`, ≥ `&ge;`, ≡ `&equiv;`, ≢ `&nequiv;`, √ `&radic;`, ∑ `&sum;`
- Don't use an asterisk to indicate multiplication in text; use × (or the dot operator to match a UI). You can omit the multiplication symbol when unambiguous: *ab* instead of *a* × *b*.

### Operators and variables
- Use entities, not keyboard symbols, for operators (e.g., `&minus;`, not a hyphen). Put a nonbreaking space on both sides of operators. Don't italicize operators. ✅ *a* − *b*
- Italicize variables. ✅ *x* ≠ *y*

### Expressions and equations
- Keep short expressions inline, with nonbreaking spaces between components so they don't wrap. Put an expression on its own line if it creates an awkward break. ✅ "The equation that describes a linear trend line is *y* = *a* + *bx*."

### Exponents and subscripts
- Use `<sup>` for exponents and `<sub>` for subscripts; no space between base and exponent; never the caret. ✅ `2<sup>3</sup>` ❌ 2^3

### Notation as words
- Prefer notation over words in running text when it stays clear and grammatical; use words when notation would be ambiguous or hard to read.
  ✅ "Check whether *a* > *b*." ❌ "Check whether *a* is greater than *b*."
  ✅ "The area is calculated by multiplying the length by the width." ❌ "multiplying *l* × *w*"

### Complex equations
- For complex or multiline equations that standard HTML can't represent clearly, use diagrams, images, or a dedicated math rendering tool. Charts (pie, bar) help when comparing statistics or illustrating percentages.

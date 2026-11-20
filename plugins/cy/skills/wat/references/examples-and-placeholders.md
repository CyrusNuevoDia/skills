# Examples and placeholders

## General

- Never use real domain names, email addresses, phone numbers, person names, project names, credit card numbers, or any other personally identifiable information (PII) in examples. Use fictitious values or placeholders like `USER_ID` or `EMAIL_ADDRESS`.

## Example domain names

- Use the IANA-reserved documentation domains: example.com, example.org, or example.net.
- Alternatively, use domains reserved specifically for documentation: altostrat.com, examplepetstore.com, example-pet-store.com, myownpersonaldomain.com, my-own-personal-domain.com, cymbalgroup.com.
- For internationalized domain names, use an IDN Test TLD test-site URL.
- Encode hostnames containing non-ASCII characters with Punycode. ✅ Recommended: `http://مثال.إختبار` is encoded as `xn--kgbechtv`.

## Example email addresses

- Build addresses from an approved example domain and an approved example person name — for example, dana@example.com. Generic addresses like support@example.net are fine.
- Don't use real person names, product names, or made-up names in email addresses.

## Example person names

- Draw given names from this list: Alex, Amal, Ariel, Bola, Charlie, Cruz, Dana, Dani, Hao, Ira, Izumi, Jie, Kai, Kalani, Kim, Kiran, Lee, Lucian, Luka, Mahan, Noam, Nur, Quinn, Raha, Rosario, Sasha, Tal, Taylor, Tristan, Yuri.
- For surnames, use an initial after the given name — for example, Quinn N. or Dana A.
- Include a variety of people in examples; your audience spans jobs, cultures, and backgrounds.
- Use the gender-neutral singular pronouns *they*, *their*, *theirs* whenever possible; don't specify gender unless it's integral to the information. Avoid examples that depend on a gender binary. If an example must specify gender, verify the chosen names don't carry a conflicting gender connotation in a given language or culture.
- Watch for stereotypes in hypothetical examples — for example, executive roles disproportionately assigned particular gendered personas, or developer/engineer roles disproportionately assigned particular ethnic personas.
- Don't use the Alice and Bob cast of characters unless documenting a technical specification that uses them; if you do, use only names from that cast.

## Example company names

- Use Example Organization. To differentiate two fictional companies, add a description: Enterprise Example Organization and Startup Example Organization.

## Example phone numbers

- Use a US number in the reserved-for-fiction range 800-555-0100 through 800-555-0199.
- Never use a real phone number.

## Example IP addresses

- IPv4: use RFC 5737 documentation ranges — `192.0.2.0`–`192.0.2.255`, `198.51.100.0`–`198.51.100.255`, `203.0.113.0`–`203.0.113.255`.
- IPv4 ranges: `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24`.
- IPv6: use the RFC 3849 range — for example, `2001:db8::`, `2001:db8:1:1:1:1:1:1`, `2001:db8:ffff:ffff:ffff:ffff:ffff:ffff`.
- IPv6 ranges: `2001:db8::/32`.

## Example street addresses

- Don't use real street addresses. Use one of these fictional ones:
  - 1800 Amphibious Blvd., Mountain View, CA 94045
  - Avenida da Pastelaria, 1903, Lisbon, 1229-076
  - 8 Rue du Nom Fictif, 341 Paris

## Example project names

- Create names that are meaningful or descriptive and applicable to the reader's environment. Don't use unclear components like `foo`, `bar`, or `baz`.
- When needed, append a numbering scheme: `staging`, `frontend-development`, `backend-development`, `production-1`, `production-2`.

## Example service account IDs

- Use the numeric ID `123456789012345678901`. ✅ Recommended: The allow policy shows the identifier `deleted:serviceAccount:my-service-account@my-project.iam.gserviceaccount.com?uid=123456789012345678901`.

## Introducing examples in sentences

Introduce examples with *such as*, *for example*, or *like*, following these patterns:

- **End of sentence (short-to-medium example):** set the example off with a comma, parentheses, or an em dash. Don't use a semicolon.
  - ✅ Recommended: Choose a strong encryption algorithm, such as AES-256.
  - ✅ Recommended: You can monitor various metrics for your managed database instances—for example, CPU utilization, storage capacity, and active connections.
  - ✅ Recommended: The API supports common image formats like PNG and JPEG.
  - ❌ Not recommended: Specify the region for deployment; for example, `us-central1`.
  - ❌ Not recommended: Enter a name for the instance (for example, `my-instance-99`).
- **Middle of sentence (short example only):** keep it short and set it off with dashes, commas, or parentheses.
  - ✅ Recommended: Enter a six-digit hex number (for example, `228B22`), and then click **OK**.
  - ✅ Recommended: Some elements, like buttons and input fields, have default accessibility attributes.
  - ❌ Not recommended: Enter a six-digit hex number (for example, if you want the color forest green, enter `228B22`), and then click **OK**.
- **Longer example:** introduce it as a separate sentence, using *for example* as an adverb; rewrite rather than cramming a long example mid-sentence.
  - ✅ Recommended: You can assign tags to your virtual machine instances to categorize them. For example, you could tag instances by environment with `env:prod` or `env:dev`.

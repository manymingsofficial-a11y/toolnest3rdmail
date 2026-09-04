import { PageHeader } from '@/components/page-header';

const lastUpdated = 'September 4, 2026';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
      />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="space-y-8">
          <div className="rounded-2xl glass-card p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              ToolNest (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;the site&rdquo;) provides free online tools at
              freetoolnest.vercel.app. This Privacy Policy explains what
              information we collect, how we use it, and the choices you have.
              By using the site, you agree to the practices described here.
            </p>
          </div>

          <PolicySection title="1. Tools Run in Your Browser">
            <p>
              The majority of ToolNest tools — including PDF, image, audio,
              video, text, developer, design, and calculator tools — process
              your files and input entirely in your browser. Files you upload
              and text you type into these tools are <strong>not</strong> sent
              to our servers. They never leave your device unless a specific
              tool explicitly states otherwise in its own interface.
            </p>
            <p>
              Because processing happens locally, we do not have access to the
              contents of your files, the text you convert, or the images you
              edit.
            </p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Usage analytics data.</strong> We use Google Analytics
                and our own internal analytics to understand how visitors use
                the site. This includes page views, search queries, device type
                (mobile, tablet, or desktop), browser, operating system,
                approximate geographic region (country/city derived from IP
                address), referrer, and whether a visitor is new or returning.
              </li>
              <li>
                <strong>Cookie and local storage data.</strong> We use cookies
                and browser local storage for analytics, advertising, and
                remembering your preferences (such as theme choice, favorite
                tools, and recently used tools). See Sections 3 and 4 below.
              </li>
              <li>
                <strong>Newsletter email address.</strong> If you subscribe to
                our newsletter, we collect the email address you submit so we
                can send you updates. You can unsubscribe at any time using the
                link in any newsletter email.
              </li>
              <li>
                <strong>Contact messages.</strong> If you contact us by email,
                we receive the information you choose to include in your
                message.
              </li>
            </ul>
            <p>
              We do <strong>not</strong> require you to create an account, and
              we do not collect your name, phone number, or payment
              information. There is no registration on ToolNest.
            </p>
          </PolicySection>

          <PolicySection title="3. Cookies and Local Storage">
            <p>
              ToolNest uses cookies and similar technologies for the following
              purposes:
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Analytics cookies.</strong> Google Analytics sets
                cookies to measure how you found the site, how long you stay,
                and which pages you visit. These cookies help us improve the
                site.
              </li>
              <li>
                <strong>Advertising cookies.</strong> Google AdSense and its
                partners may set cookies to show you relevant ads based on your
                visit to this and other websites. See Section 5 for details.
              </li>
              <li>
                <strong>Preference storage.</strong> We use browser local
                storage to remember your favorited tools, recently used tools,
                QR code generation history, theme preference (light or dark),
                and a random visitor/session identifier for analytics. This
                data is stored on your own device and is not transmitted to our
                servers.
              </li>
            </ul>
            <p>
              You can control or delete cookies through your browser settings.
              Disabling cookies may affect some site functionality.
            </p>
          </PolicySection>

          <PolicySection title="4. Google Analytics">
            <p>
              We use Google Analytics to collect and analyze usage data such as
              page views, session duration, traffic sources, and device
              information. Google Analytics collects this data using cookies
              and may combine it with data from other Google services.
            </p>
            <p>
              The data collected is aggregated and anonymous — it is not linked
              to your identity. You can review Google&rsquo;s privacy practices
              and opt out of Google Analytics at{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-purple underline underline-offset-2 hover:opacity-80"
              >
                tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection title="5. Google AdSense and Third-Party Advertising">
            <p>
              ToolNest displays advertisements served by Google AdSense. Google
              and its advertising partners may use cookies to serve ads based
              on your prior visits to this and other websites.
            </p>
            <ul className="ml-4 list-disc space-y-2">
              <li>
                Google&rsquo;s use of advertising cookies enables it and its
                partners to serve ads based on your visit to our site and/or
                other sites on the internet.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple underline underline-offset-2 hover:opacity-80"
                >
                  google.com/settings/ads
                </a>
                .
              </li>
              <li>
                For more information about how Google uses data when you
                interact with ads, visit{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple underline underline-offset-2 hover:opacity-80"
                >
                  policies.google.com/technologies/partner-sites
                </a>
                .
              </li>
            </ul>
            <p>
              Third-party advertising vendors and ad networks may also use
              cookies to serve ads on this site. These vendors have their own
              privacy policies governing the use of data they collect.
            </p>
          </PolicySection>

          <PolicySection title="6. Newsletter">
            <p>
              When you subscribe to the ToolNest newsletter, we store your email
              address so we can send you updates about new tools and site
              improvements. We do not share your email with third parties for
              marketing purposes. You can unsubscribe at any time by clicking
              the unsubscribe link in any newsletter email.
            </p>
          </PolicySection>

          <PolicySection title="7. Internal Analytics">
            <p>
              In addition to Google Analytics, ToolNest runs its own internal
              analytics system that records page views, search queries, and ad
              impressions. This system generates a random visitor identifier and
              session identifier stored in your browser&rsquo;s local storage.
              These identifiers are not linked to your name or email and are
              used solely to understand aggregate usage patterns.
            </p>
          </PolicySection>

          <PolicySection title="8. Data We Do Not Collect">
            <ul className="ml-4 list-disc space-y-2">
              <li>We do not require accounts or registration.</li>
              <li>We do not collect your name, address, or phone number.</li>
              <li>
                We do not collect payment or financial information — all tools
                are free.
              </li>
              <li>
                We do not have access to the contents of files processed by
                browser-based tools.
              </li>
              <li>
                We do not sell your personal data to third parties.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="9. Children&rsquo;s Privacy">
            <p>
              ToolNest is not directed at children under 13 and we do not
              knowingly collect personal information from children. If you
              believe a child has provided us with personal information, please
              contact us so we can remove it.
            </p>
          </PolicySection>

          <PolicySection title="10. Your Choices">
            <ul className="ml-4 list-disc space-y-2">
              <li>
                <strong>Cookies:</strong> Adjust your browser cookie settings or
                use private/incognito browsing to limit cookie storage.
              </li>
              <li>
                <strong>Personalized ads:</strong> Visit{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple underline underline-offset-2 hover:opacity-80"
                >
                  google.com/settings/ads
                </a>{' '}
                to opt out of personalized advertising.
              </li>
              <li>
                <strong>Google Analytics:</strong> Install the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple underline underline-offset-2 hover:opacity-80"
                >
                  Google Analytics opt-out browser add-on
                </a>
                .
              </li>
              <li>
                <strong>Local storage:</strong> Clear your browser data to
                remove favorites, recently used tools, QR history, visitor IDs,
                and theme preferences.
              </li>
              <li>
                <strong>Newsletter:</strong> Unsubscribe using the link in any
                newsletter email.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="11. Data Security">
            <p>
              We take reasonable measures to protect the data we hold. However,
              no method of transmission over the internet or electronic storage
              is 100% secure. Browser-based tool processing is inherently
              private because your files do not leave your device.
            </p>
          </PolicySection>

          <PolicySection title="12. Third-Party Links">
            <p>
              ToolNest may contain links to external websites that are not
              operated by us. We have no control over and assume no
              responsibility for the content, privacy policies, or practices of
              these third-party sites. We do not endorse their content.
            </p>
          </PolicySection>

          <PolicySection title="13. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated revision date. We
              encourage you to review this page periodically.
            </p>
          </PolicySection>

          <PolicySection title="14. Contact Us">
            <p>
              If you have questions or concerns about this Privacy Policy or
              your data, please reach out through our{' '}
              <a
                href="/contact"
                className="text-brand-purple underline underline-offset-2 hover:opacity-80"
              >
                contact page
              </a>
              .
            </p>
          </PolicySection>
        </div>
      </section>
    </>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl glass-card p-8">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

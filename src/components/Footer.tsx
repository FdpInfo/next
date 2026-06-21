"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import { useI18n } from "@/lib/i18n";

// On the /next deployment, raw <a href="/x"> points at the ROOT site
// (fdpinfo.github.io/x) instead of /next/x — next/Link would prepend the
// basePath. The secondary pages already live on the root, so we link there.
const LINK_CLASS =
  "text-color-gray-300 transition-all transition-duration-150ms transition-ease-in-out hover-text-gray";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer>
      <div className="mx-auto largura-maxima-72rem padding-left-right-1rem media-padding-horizontal-1-5rem">
        <div className="exibir-grade espacamento-2rem padding-top-bottom-2rem media-grade-modelo-colunas-12 padding-vertical-3rem">
          <div className="ordem-1 media-coluna-grade-abranger-12 media-ordem-normal media-abranger-coluna-grade-4">
            <div className="display-flex  altura-100-porcento flex-direction-column justificar-conteudo-espaco-entre media-flex-linha-horizontal media-flex-coluna-vertical">
              <div className="margem-inferior-1rem media-margem-inferior-0px">
                <div className="margem-inferior-1rem">
                  <Link
                    className="exibir-bloco"
                    href="/"
                    aria-label={t.footer.logoAriaLabel}
                  >
                    <img
                      src={asset("/src/resources/png/fdp.png")}
                      width="60"
                      height="60"
                      alt={t.footer.logoAlt}
                    />
                  </Link>
                </div>
                <div className="font-size-0-875rem text-color-gray-200">
                  © {new Date().getFullYear()} fdpclient{" "}
                  <span className="text-color-gray-600">·</span>{" "}
                  {t.footer.copyright}{" "}
                  <a
                    className="text-color-gray-50 transition-all transition-duration-150ms transition-ease-in-out hover-text-white"
                    href="https://lucas-lima.xyz"
                  >
                    {t.footer.author}
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
          <div className="media-coluna-grade-abranger-6 media-abranger-coluna-grade-3 media-abranger-coluna-grade-2">
            <h6 className="mb-0-5rem font-size-0-875rem font-weight-500 text-color-gray-50">
              {t.footer.products}
            </h6>
            <ul className="margem-y-0-5rem font-size-0-875rem">
              <li>
                <a className={LINK_CLASS} href="/download">
                  {t.footer.download}
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="/donate">
                  {t.footer.donatePlans}
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="/next/changelogs/">
                  {t.footer.changelog}
                </a>
              </li>
            </ul>
          </div>
          <div className="media-coluna-grade-abranger-6 media-abranger-coluna-grade-3 media-abranger-coluna-grade-2">
            <h6 className="mb-0-5rem font-size-0-875rem font-weight-500 text-color-gray-50">
              {t.footer.resources}
            </h6>
            <ul className="margem-y-0-5rem font-size-0-875rem">
              <li>
                <a className={LINK_CLASS} href="/community">
                  {t.footer.community}
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="/tos">
                  {t.footer.tos}
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="/community">
                  {t.footer.reportBug}
                </a>
              </li>
            </ul>
          </div>
          <div className="media-coluna-grade-abranger-6 media-abranger-coluna-grade-3 media-abranger-coluna-grade-2">
            <h6 className="mb-0-5rem font-size-0-875rem font-weight-500 text-color-gray-50">
              {t.footer.legals}
            </h6>
            <ul className="margem-y-0-5rem font-size-0-875rem">
              <li>
                <a className={LINK_CLASS} href="/refund">
                  {t.footer.refund}
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="/terms">
                  {t.footer.terms}
                </a>
              </li>
              <li>
                <a className={LINK_CLASS} href="/privacy">
                  {t.footer.privacy}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import NextDocument from 'next/document';
import {ServerStyleSheet as StyledComponentSheets} from 'styled-components';
import {ServerStyleSheets as MaterialUiServerStyleSheets} from '@material-ui/styles';
import {extractCritical} from "@emotion/server";

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        })

      const initialProps = await NextDocument.getInitialProps(ctx);
      const emotionStyles = extractCritical(initialProps.html);

      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
            <style
              data-emotion-css={emotionStyles.ids.join(' ')}
              dangerouslySetInnerHTML={{__html: emotionStyles.css}}
            />
          </React.Fragment>
        ],
      }
    } finally {
      styledComponentSheet.seal()
    }
  }
}
import {
  codeBlockPlugin,
  codeMirrorPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from 'commonwealth-mdxeditor';
import React, { memo, useState } from 'react';
import { CWIcon } from 'views/components/component_kit/cw_icons/cw_icon';
import { useEditorErrorHandler } from 'views/components/MarkdownEditor/useEditorErrorHandler';
import { codeBlockLanguages } from 'views/components/MarkdownEditor/utils/codeBlockLanguages';
import { useComputeMarkdownWithCutoff } from 'views/components/MarkdownViewer/UseComputeMarkdownWithCutoff';

import './MarkdownViewer.scss';

export type MarkdownStr = string;

export type MarkdownViewerProps = Readonly<{
  markdown: MarkdownStr | undefined;
  cutoffLines?: number;
}>;

export const MarkdownViewer = memo(function MarkdownViewer(
  props: MarkdownViewerProps,
) {
  const errorHandler = useEditorErrorHandler();

  const toggleDisplay = () => setUserExpand(!userExpand);

  const [truncated, truncatedMarkdown, initialMarkdown] =
    useComputeMarkdownWithCutoff(props.markdown ?? '', props.cutoffLines);

  const [userExpand, setUserExpand] = useState<boolean>(false);

  return (
    <div className="MarkdownViewer">
      <MDXEditor
        key={'user-expand' + userExpand}
        onError={errorHandler}
        markdown={userExpand ? initialMarkdown : truncatedMarkdown}
        placeholder=""
        readOnly={true}
        plugins={[
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          codeBlockPlugin(),
          codeMirrorPlugin({
            codeBlockLanguages,
          }),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
        ]}
      />

      {truncated && !userExpand && (
        <>
          <div className="show-more-button-wrapper">
            <div className="show-more-button" onClick={toggleDisplay}>
              <CWIcon iconName="plus" iconSize="small" />
              <div className="show-more-text">Show More</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

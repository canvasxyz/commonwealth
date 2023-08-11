import { useGetThreadsByIdQuery } from 'state/api/threads';
import { filterLinks } from 'helpers/threads';
import { getProposalUrlPath } from 'identifiers';
import 'pages/view_thread/linked_threads_card.scss';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import app from 'state';
import { CWSpinner } from 'views/components/component_kit/cw_spinner';
import { slugify } from '../../../../../shared/utils';
import type Thread from '../../../models/Thread';
import { LinkSource } from '../../../models/Thread';
import { CWButton } from '../../components/component_kit/cw_button';
import { CWContentPageCard } from '../../components/component_kit/cw_content_page';
import { Modal } from '../../components/component_kit/cw_modal';
import { CWText } from '../../components/component_kit/cw_text';
import { LinkedThreadModal } from '../../modals/linked_thread_modal';

type LinkedThreadsCardProps = {
  thread: Thread;
  allowLinking: boolean;
};

export const LinkedThreadsCard = ({
  thread,
  allowLinking,
}: LinkedThreadsCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const linkedThreadIds = useMemo(
    () =>
      filterLinks(thread.links, LinkSource.Thread).map(
        ({ identifier }) => identifier
      ),
    [thread.links]
  );

  const { data: linkedThreads, isLoading } = useGetThreadsByIdQuery({
    chainId: app.activeChainId(),
    ids: linkedThreadIds.map(Number),
  });

  return (
    <>
      <CWContentPageCard
        header="Linked Discussions"
        content={
          linkedThreadIds.length > 0 && isLoading ? (
            <div className="spinner-container">
              <CWSpinner size="medium" />
            </div>
          ) : (
            <div className="LinkedThreadsCard">
              {linkedThreadIds.length > 0 ? (
                <div className="links-container">
                  {linkedThreads.map((t) => {
                    const discussionLink = getProposalUrlPath(
                      t.slug,
                      `${t.identifier}-${slugify(t.title)}`,
                      false
                    );

                    return (
                      <Link key={t.id} to={discussionLink}>
                        {t.title}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <CWText type="b2" className="no-threads-text">
                  There are currently no linked discussions.
                </CWText>
              )}
              {allowLinking && (
                <CWButton
                  buttonType="mini-black"
                  label="Link discussion"
                  onClick={() => setIsModalOpen(true)}
                />
              )}
            </div>
          )
        }
      />
      <Modal
        content={
          <LinkedThreadModal
            thread={thread}
            linkedThreads={linkedThreads}
            onModalClose={() => setIsModalOpen(false)}
          />
        }
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      />
    </>
  );
};

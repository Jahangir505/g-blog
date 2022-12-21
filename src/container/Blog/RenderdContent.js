/* eslint-disable */
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Remarkable } from 'remarkable';
import Head from "next/head";


function RenderdContent({
    children,
    post,
    disableImageSave,
    title = 'Glostars',
    metaDesc = '',
    ...rest
}) {
    const [content, setContent] = useState('');
    const contentRef = useRef();

    const disableImgContextMenu = () => {
        if (contentRef.current) {
            contentRef.current.querySelectorAll('img').forEach((item) => {
                // eslint-disable-next-line no-param-reassign
                item.oncontextmenu = () => false;
            });
        }
    };

    // useEffect(() => {
    //     document.title = `Glostars | ${title}`;
    // })

    useEffect(() => {
        // window.scrollTo(0, 0);
        const md = new Remarkable({
            html: true,
        });
        setContent(md.render(post));

        if (disableImageSave) {
            disableImgContextMenu();
        }
    }, [post, content, disableImageSave]);

    const parsedContent = (
        <Box
            {...rest}
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );

    return (
        <>
            {children(parsedContent)}
        </>
    );
}

export default RenderdContent;

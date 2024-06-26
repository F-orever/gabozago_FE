import React, { useEffect, useState } from "react";
import { get } from "../../../utils/api";
import ArticleItem from "../ArticleItem";

import * as S from "./style";

interface TArticle {
    "next": null | string,
    "previous": null | string,
    "results": {
        "id": number,
        "title": string,
        "thumbnailURL": string,
        "subtitle": string,
        "isBookmarked": boolean
    }[]
}

function Articles() {
    const [articleData, setArticleData] = useState<TArticle['results']>([]);
    const [next, setNext] = useState<TArticle['next']>(null);
    const infiniteRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        get<TArticle>('/community/article?ordering=latest')
            .then((response) => {
                setArticleData(response.data.results);
                setNext(response.data.next);
            })
    }, [])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting && next) {
                    get<TArticle>(next)
                        .then((response) => {
                            setArticleData([...articleData, ...response.data.results]);
                            setNext(response.data.next);
                        })
                }
            })
        }, options)

        if(infiniteRef.current) {
            observer.observe(infiniteRef.current);
        }

        return () => observer.disconnect();
    })

    return (
        <S.Container>
            <S.ArticleList>
                {
                    articleData && articleData.map((article) => <ArticleItem 
                        id={article.id}
                        title={article.title}
                        desc={article.subtitle}
                        thumbnailURL={article.thumbnailURL}
                        isBookmarked={article.isBookmarked}
                    />)
                }
                <div ref={infiniteRef}/>
            </S.ArticleList>
        </S.Container>
    )
}

export default Articles;
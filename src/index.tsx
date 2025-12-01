// точка входа приложения
import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm'; // форма настроек
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps'; // заданные по умолчанию настройки формы

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// состояние примененных настроек статьи
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties // указание типа
			}>
			{/* форма получает только колбэк применения */}
			<ArticleParamsForm onApply={setArticleState} />
			<Article /> {/* статья с текущими настройками */}
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

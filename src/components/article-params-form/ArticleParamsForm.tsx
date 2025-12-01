// компонент с настройкой параметров статьи
import { useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	defaultArticleState,
	type ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	// колбек, который применяет новые настройки к статье
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	// открыта ли панель
	const [isOpen, setIsOpen] = useState(false);

	// внутреннее состояние формы
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// корневой контейнер панели
	const rootRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	// закрываем по клику вне панели
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => {},
		onChange: setIsOpen,
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// применяем настройки к статье
		onApply(formState);
	};

	const handleReset = () => {
		// сбрасываем форму на дефолтные значения
		setFormState(defaultArticleState);
		// и сразу применям их к статье
		onApply(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			{/*кнопка-стрелка для открытия/закрытия боковой панели */}
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontColor: option }))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, contentWidth: option }))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>

						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
 

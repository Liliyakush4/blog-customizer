// выпадающий список
import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

type SelectProps = {
	selected: OptionType | null; // выбранная опция
	options: OptionType[]; // доступные опции
	placeholder?: string; // текст-заглушка
	onChange?: (selected: OptionType) => void; // при изменении выбора
	onClose?: () => void; // при закрытии списка
	title?: string; // заголовок над списком
};

export const Select = (props: SelectProps) => {
	const { options, placeholder, selected, onChange, onClose, title } = props; // деструктуризация пропсов
	const [isOpen, setIsOpen] = useState<boolean>(false); // открыт/закрыт список
	const rootRef = useRef<HTMLDivElement>(null); // ref на корневой элемент
	const placeholderRef = useRef<HTMLDivElement>(null); // ref на плейсхолдер
	const optionClassName = selected?.optionClassName ?? '';

	// закрытие при клике вне области списка
	({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	// открыть/закрыть по нажатию на Enter
	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	// выбор опции
	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false); // закрываем список
		onChange?.(option); // передаем выбранную опцию
	};

	// открытие/закрытие при клике по плейсхолдеру
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	return (
		<div className={styles.container}>
			{title && (
				<>
					<Text size={12} weight={800} uppercase>
						{title}
					</Text>
				</>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen}
				data-testid='selectWrapper'>
				<img src={arrowDown} alt='иконка стрелочки' className={styles.arrow} />
				<div
					className={clsx(
						styles.placeholder,
						(styles as Record<string, string>)[optionClassName] // динамически применяются классы стилей выбраненой опции
					)} // применяем класс из опции
					data-selected={!!selected?.value}
					onClick={handlePlaceHolderClick}
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder}
					</Text>
				</div>
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{options
							.filter((option) => selected?.value !== option.value) // исключаем выбранную опцию из списка
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(option)}
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};

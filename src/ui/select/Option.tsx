import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps'; // базовый тип опции
import { Text } from 'src/ui/text'; // кастомный текстовый компонент
import { isFontFamilyClass } from './helpers/isFontFamilyClass'; // вспомогательная фунуция
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit'; // кастомный зук с обработчиком нажатия ентер для выбора элемента списка

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType; // данные опции
	onClick: (value: OptionType['value']) => void; // обработчик выбора
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className }, // извлекает свойства опции
		onClick,
	} = props; // деструктуризация пропсов
	const optionRef = useRef<HTMLLIElement>(null);
	// замыкание, которое передает значение при клике
	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue);
		};
	// добавляет поддержку выбора опции по нажатию на
	useEnterOptionSubmit({
		optionRef,
		value,
		onClick,
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''])}
			value={value}
			onClick={handleClick(value)}
			tabIndex={0}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};

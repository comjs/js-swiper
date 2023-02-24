import { DependencyList } from 'react';
export type JSSliderData = {
    image: string;
    order: number;
    ad?: boolean;
} & ({
    link: string;
    newTab?: boolean;
} | {
    link?: never;
    newTab?: never;
});
type JSSliderProps<T, U, V> = {
    items: T[];
    /** millisecond */
    duration?: number;
    /** rolling interval */
    interval?: number;
    stateButton?: V;
    onChangeItem?: (item: T) => void;
    onChangeState?: (state: 'play' | 'pause') => void;
    /** bug fix */
    startEffect?: 'useEffectOnce' | ((callback: React.EffectCallback, dependencyList: DependencyList | undefined) => void);
} & ({
    prevButton: U;
    nextButton: U;
} | {
    prevButton?: null;
    nextButton?: null;
}) & ({
    width: number;
    height: number;
} | {
    width?: never;
    height?: never;
});
declare const JSSlider: <T extends JSSliderData, U extends HTMLElement | null, V extends HTMLElement | null>({ items, prevButton, nextButton, stateButton, duration, interval, onChangeItem: handleChangeItem, onChangeState: handleChangeState, width, height, startEffect, }: JSSliderProps<T, U, V>) => JSX.Element | null;
export default JSSlider;

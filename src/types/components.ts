export type onInputChange<
  E = undefined,
  V = string | undefined,
  HasIndex extends boolean = false,
> =
  HasIndex extends true ?
    (
      index: number,
      data: { checked: boolean; id?: string; name: string; value: V },
      e?: E,
    ) => void
  : (
      data: { checked: boolean; id?: string; name: string; value: V },
      e?: E,
    ) => void;

export type FormValue = string | undefined | FormValue[] | object | boolean;

export type OnFormInputChange = (data: {
  id?: string;
  name: string;
  value: FormValue;
}) => void;

export type OnFormCardChange<Value> = (
  index: number,
  data: { id?: string; name: string; value: Value },
) => void;

export type FormCardProps<Value extends object = object> = {
  baseValidatetionPath?: string;
  index: number;
  onChange: OnFormCardChange<Value | undefined>;
  onDelete: (index: number) => void;
  prefix?: string | number;
  value?: Value;
};
// & Omit<
//   ComponentProps<typeof FormCardTemplete>,
//   "value" | 'onChange' | "prefix"
// >;

export type FormCardImperativeHandle = {
  focus: () => void;
};

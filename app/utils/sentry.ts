interface CatchErrorArgs {
  title: string;
  error: Error;
  extraScope?: { key: string; value: string };
  skipToast?: boolean;
}

export const catchError = (props: CatchErrorArgs) => {
  console.error(`${props?.title} error: `, props?.error?.message);
};

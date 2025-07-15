export interface IWhatToExpectProps {
  checklist: string[];
  title?: string;
  walkthroughLabel?: string;
  buttonLabel: string;
  onButtonClick: () => void;
  estimatedTime?: string;
}

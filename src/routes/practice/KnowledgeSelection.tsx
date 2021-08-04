import { Button } from "components/Button";
import { FC } from "react";
import { Knowledge } from "./constants";

export interface KnowledgeSelectionProps {
  onSelect?: (k: Knowledge) => void;
}

export const KnowledgeSelection: FC<KnowledgeSelectionProps> = ({
  onSelect,
}) => (
  <>
    {[Knowledge.definition, Knowledge.translation].map((knowledge) => (
      <Button key={knowledge} onClick={() => onSelect && onSelect(knowledge)}>
        {Knowledge[knowledge]}
      </Button>
    ))}
  </>
);

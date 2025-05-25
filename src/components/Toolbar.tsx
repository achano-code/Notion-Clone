import { Note } from '@/modules/notes/note';
import TextAreaAutoSize from 'react-textarea-autosize';

interface TitleInputProps {
  initialData: Note;
  onTitleChange: (val: string) => void;
}

export function TitleInput({ initialData, onTitleChange }: TitleInputProps) {
  return (
    <div className="group relative pl-[54px]">
      <TextAreaAutoSize className="text-[#3F3F3F resize-none break-words bg-transparent text-5xl font-bold outline-none" />
    </div>
  );
}

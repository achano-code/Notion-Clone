import { Note } from '@/modules/notes/note.entity';
import { useState } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

interface TitleInputProps {
  initialData: Note;
  onTitleChange: (val: string) => void;
}

export function TitleInput({ initialData, onTitleChange }: TitleInputProps) {
  const [value, setValue] = useState(initialData.title ?? '無題')
  const handleInputChange = (value: string) => {
    setValue(value);
    onTitleChange(value);
  }
  return (
    <div className="group relative pl-[54px]">
      <TextAreaAutoSize onChange={(e) => handleInputChange(e.target.value)} className="text-[#3F3F3F resize-none break-words bg-transparent text-5xl font-bold outline-none" value={value} />
    </div>
  );
}

import { cn } from '@/lib/utils';
import { NoteItem } from './NoteItem';
import { useNoteStore } from '@/modules/notes/note.state';
import { useCurrentUserStore } from '@/modules/auth/current-user.state';
import { noteRepository } from '@/modules/notes/notes.repository';
import { Note } from '@/modules/notes/note.entity';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface NoteListProps {
  layer?: number;
  parentId?: number;
}

export function NoteList({ layer = 0, parentId }: NoteListProps) {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  const { currentUser } = useCurrentUserStore();
  const [expanded, setExpanded] = useState<Map<number, boolean>>(new Map());
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id != null ? parseInt(params.id) : undefined;

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.stopPropagation();
    const newNote = await noteRepository.create(currentUser!.id, { parentId })
    noteStore.set([newNote])
    setExpanded((prev) => prev.set(parentId, true))
    moveToDetail(newNote.id)
  }

  const featchChildren = async (e: React.MouseEvent, note: Note) => {
    e.stopPropagation();
    const children = await noteRepository.find(currentUser!.id, note.id);
    if (children == null) return;
    noteStore.set(children);
    setExpanded((prev) => {
      const newExpanded = new Map(prev);
      newExpanded.set(note.id, !prev.get(note.id))
      return newExpanded;
    })
  }

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`)
  }

  const deleteNote = async (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    await noteRepository.delete(noteId);
    noteStore.delete(noteId);
    navigate("/")
  }

  return (
    <>
      <p
        className={cn(
          `hidden text-sm font-medium text-muted-foreground/80`,
          layer === 0 && 'hidden',
        )}
        style={{ paddingLeft: layer ? `${layer * 12 + 25}px` : undefined }}
      >
        ページがありません
      </p>
      {notes.
        filter((note) => note.parent_document == parentId)
        .map((note) => {
          return (
            <div key={note.id}>
              <NoteItem
                note={note}
                layer={layer}
                isSelected={id == note.id}
                expanded={expanded.get(note.id)}
                onCreate={(e) => createChild(e, note.id)}
                onClick={() => moveToDetail(note.id)}
                onExpand={(e: React.MouseEvent) => featchChildren(e, note)}
                onDelete={(e) => deleteNote(e, note.id)} />
              {expanded.get(note.id) && (
                <NoteList layer={layer + 1} parentId={note.id} />
              )}
            </div>
          );
        })}
    </>
  );
}

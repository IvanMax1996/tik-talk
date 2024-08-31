import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core'
import { Event } from '@angular/router'

@Directive({
  selector: '[dnd]',
  standalone: true
})
export class DndDirective {
  @Output() fileDropped: EventEmitter<File> = new EventEmitter<File>()

  @HostBinding('class.file-over')
  fileOver: boolean = false

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()

    this.fileOver = true
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()

    this.fileOver = false
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()

    this.fileOver = false

    this.fileDropped.emit(event.dataTransfer!.files[0])
  }
}

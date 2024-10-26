import dynamic from 'next/dynamic'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const ReactDraftWysiwyg = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
    ssr: false
})

const Editor = (props) => {
    const { onChange, value } = props;

    return <ReactDraftWysiwyg
        editorState={value || EditorState.createEmpty()}
        onEditorStateChange={data => onChange(data)}
        editorStyle={{
            minHeight: 400
        }}
    />
}

export default Editor
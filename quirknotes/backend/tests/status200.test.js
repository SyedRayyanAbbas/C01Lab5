//test("1+2=3, empty array is empty", () => {
//    expect(1 + 2).toBe(3);
//    expect([].length).toBe(0);
//  });

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
    // Code here
    const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	  });

	const getAllNotes = await fetch("http://localhost:4000/getAllNotes");
	const getAllNotesJ = await getAllNotes.json();
	  
	expect(getAllNotes.status).toBe(200);
	expect(getAllNotesJ.response).toStrictEqual([]);
  });
  
  test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
    // Code here
    const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	  });

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

  	const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const getAllNotes = await fetch("http://localhost:4000/getAllNotes");
	const getAllNotesJ = await getAllNotes.json();
	  
    expect(getAllNotes.status).toBe(200);
    expect(getAllNotesJ.response.length).toBe(2);
  });
  
  test("/deleteNote - Delete a note", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();

    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${postNoteBody.insertedId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleteNoteBody = await deleteNoteRes.json();

    expect(deleteNoteRes.status).toBe(200);

  });
  
  test("/patchNote - Patch with content and title", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const updatedTitle = "Updated Title";
    const updatedContent = "Updated Content";

    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${postNoteBody.insertedId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: updatedTitle,
        content: updatedContent,
        }),
    });

    const patchNoteBody = await patchNoteRes.json();

    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toBe(`Document with ID ${postNoteBody.insertedId} patched.`);
    const deleteNoteRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
  });
  });
  
  test("/patchNote - Patch with just title", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const postNoteBody = await postNoteRes.json();

    const noteId = postNoteBody.insertedId;

    const patchedTitle = "NoteTitleTestPatch";
  
    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: patchedTitle,
      }),
    });
  
    const patchNoteBody = await patchNoteRes.json();
  
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toStrictEqual(`Document with ID ${noteId} patched.`);
  });
  
  test("/patchNote - Patch with just content", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const postNoteBody = await postNoteRes.json();

    const noteId = postNoteBody.insertedId;

    const patchedContent = "NoteTitleContentPatch";
  
    const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: patchedContent,
      }),
    });
  
    const patchNoteBody = await patchNoteRes.json();
  
    expect(patchNoteRes.status).toBe(200);
    expect(patchNoteBody.response).toStrictEqual(`Document with ID ${noteId} patched.`);
  });
  
  test("/deleteAllNotes - Delete one note", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();

    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const deleteAllNotesBody = await deleteAllNotesRes.json();

    expect(deleteAllNotesRes.status).toBe(200);
  });
  
  test("/deleteAllNotes - Delete three notes", async () => {
    // Code here
    const deleteAll = await fetch("http://localhost:4000/deleteAllNotes", {
		method: "DELETE"
	  });

	expect(deleteAll.status).toBe(200);

	const title = "NoteTitleTest";
  	const content = "NoteTitleContent";

  	const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});

	const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  	});


	const deleteANote = await fetch(`http://localhost:4000/deleteAllNotes`, {
		method: "DELETE"
	});

	const deleteANoteR = await deleteANote.json();
	expect(deleteANote.status).toBe(200);

	expect(deleteANoteR.response).toBe("3 note(s) deleted.");
  });
  
  test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    // Code here
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";

    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });

    const postNoteBody = await postNoteRes.json();
    const noteIdToUpdate = postNoteBody.insertedId
    const updatedColor = "#FF0000";

    const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteIdToUpdate}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        color: updatedColor,
        }),
    });

    const updateNoteColorBody = await updateNoteColorRes.json();

    expect(updateNoteColorRes.status).toBe(200);
    expect(updateNoteColorBody.message).toBe("Note color updated successfully.");
});
    // async function buscarProdutos() {
    //     try {
    //         if (!user) return;

    //         const ref = collection(db, 'produtos');
    //         const q = query(ref, where('userId', '==', user.uid));

    //         const snapshot = await getDocs(q);

    //         const list = snapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //         }));

    //         setProdutos(list);
    //     }
    //     catch (error) {
    //         console.log('Erro ao buscar produtos: ', error);
    //     }
    // };

    // async function deleteProduto(produto) {
    //     try {
    //         await deleteDoc(doc(db, 'produtos', produto.id));
    //         await buscarProdutos();
    //     } catch (error) {
    //         console.log('Erro ao deletar produto: ', error);
    //     }
    // }

    // async function addProduto() {
    //     if (!user) {
    //         throw new Error('Usuário não autenticado');
    //     }
    //     if (!nome.trim() || !quantidade || !preco) {
    //         throw new Error('Preencha todos os campos!');
    //     }

    //     try {
    //         await addDoc(collection(db, 'produtos'), {
    //             dataAdicao: serverTimestamp(),
    //             nome: nome.trim(),
    //             precoUnitario: parseFloat(preco.replace(',', '.')),
    //             quantidade: parseInt(quantidade),
    //             userId: user.uid
    //         });

    //         setNome('');
    //         setQuantidade('');
    //         setPreco('');
    //         Keyboard.dismiss();

    //         await buscarProdutos();
    //     } catch (error) {
    //         console.log('Erro ao adicionar produto: ', error);
    //         throw error;
    //     }
    // }

    // async function editarProduto(produto) {
    //     if(!produto.id) return;

    //     try {
    //         const ref = doc(db, 'produtos', produto.id);

    //         await updateDoc(ref, {
    //             nome: produto.nome.trim(),
    //             precoUnitario: parseFloat(String(produto.precoUnitario).replace(',', '.')),
    //             quantidade: parseInt(produto.quantidade)
    //         });

    //         await buscarProdutos();
    //     } catch (error) {
    //         console.log('Erro ao editar produto: ', error);
    //         throw error;
    //     }
    // }